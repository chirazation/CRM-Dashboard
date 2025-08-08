
import { format } from "date-fns";
import { Pencil, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description: string;
  date: Date;
  note?: string;
};


export const ReminderCard = ({
  title,
  description,
  note,
  date
} : Props ) => {
  

  return (
     <Card className="text-sm shadow-md rounded-xl border gap-2 p-2">
      <CardHeader className="flex flex-row items-center justify-between ">
        <CardTitle className="text-base font-semibold truncate">{title}</CardTitle>
        <div className="flex ">
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6"
            
          >
            <Pencil size={16} className="text-muted-foreground" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6"
          >
            <Trash2 size={16} className="text-red-500" />
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
