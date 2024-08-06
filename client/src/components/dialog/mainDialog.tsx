import { IDialogProps } from "@/interfaces/component.interfaces";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function MainDialog({
  buttonName,
  title,
  description,
  children,
  handleClick,
}: Readonly<IDialogProps>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{buttonName}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
        <DialogFooter>
          <Button onClick={handleClick}>{buttonName}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
