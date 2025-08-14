import { format } from "date-fns";
import { Trash2, Pencil, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ReminderForm from "@/components/reminderform"; 
type Props = {
  id: string;
  title: string;
  description: string;
  date: Date;
  note?: string;
  onUpdate?: () => void; 
};

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

export const ReminderCard = ({
  id,
  title,
  description,
  note,
  date,
  onUpdate
} : Props ) => {
  const [alert, setAlert] = useState<AlertState>({ show: false, type: 'success', message: '' });
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: number | null }>({
    show: false,
    id: null
  });
  const [showEditForm, setShowEditForm] = useState(false);

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: 'success', message: '' }), 5000);
  };

  const handleDeleteConfirm = (id: number) => {
    setDeleteConfirm({ show: true, id });
  };

  const handleEditSuccess = () => {
    setShowEditForm(false);
    showAlert('success', 'Reminder updated successfully');
    onUpdate?.(); 
  };

  const handleEditCancel = () => {
    setShowEditForm(false);
  };

  // Delete
  const handleDelete = async () => {
    if (!deleteConfirm.id) return;
    try {
      const res = await fetch(`/api/reminders/${deleteConfirm.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error deleting reminder');
      showAlert('success', 'Reminder deleted successfully');
      setDeleteConfirm({ show: false, id: null });
      onUpdate?.(); // Refresh the parent component
    } catch (err) {
      console.error('Error deleting reminder', err);
      showAlert('error', 'Error while deleting reminder');
    }
  };
  
  return (
    <Card className="text-sm shadow-md rounded-xl border gap-2 p-2">
      {/* Alerte */}
      {alert.show && (
        <div className={cn(
          "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 transition-all duration-300",
          alert.type === 'success' 
            ? "bg-green-100 text-green-700 border border-green-200"
            : "bg-red-100 text-red-700 border border-red-200"
        )}>
          {alert.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{alert.message}</span>
          <button 
            onClick={() => setAlert({ show: false, type: 'success', message: '' })}
            className="ml-4 text-lg font-bold hover:opacity-70"
          >
            ×
          </button>
        </div>
      )} 

      {/* Edit Form Modal */}
      {showEditForm && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300">
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="max-h-[90vh] overflow-y-auto">
              <ReminderForm
                editMode={true}
                editData={{
                  id,
                  title,
                  description,
                  date,
                  note
                }}
                onSuccess={handleEditSuccess}
                onCancel={handleEditCancel}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300">
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Confirm deletion</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete the reminder? This action is irreversible.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirm({ show: false, id: null })}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <CardHeader className="flex flex-row items-center justify-between ">
        <CardTitle className="text-base font-semibold truncate">{title}</CardTitle>
        <div className="flex ">
          <Button size="icon" variant="ghost" className="h-6 w-6 "  onClick={() => setShowEditForm(true)}>
            <Pencil size={16} className="text-green-600 hover:text-green-900" />
          </Button>
          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleDeleteConfirm(Number(id))}>
            <Trash2 size={16} className="text-red-600 hover:text-red-800" />
          </Button>
        </div>
      </CardHeader>

      {description && (
        <CardDescription className="px-4 text-gray-500">
          {description}
        </CardDescription>
      )}

      <CardContent className="px-4 pt-2">
        <p className="text-muted-foreground">
          Reminder set for: <span className="font-medium">{format(date, 'yyyy-MM-dd')}</span>
        </p>
        {note && (
          <p className="mt-2 whitespace-pre-line text-gray-700">{note}</p>
        )}
      </CardContent>
    </Card>
  );
}