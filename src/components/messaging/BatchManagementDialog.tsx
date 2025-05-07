
import React, { useState } from "react";
import { X, UserPlus, Edit, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface BatchManagementDialogProps {
  open: boolean;
  onClose: () => void;
  courseName: string;
  batchName: string;
  batchId: string;
  students: Student[];
  onBatchNameChange: (batchId: string, newName: string) => void;
  onStudentRemove: (batchId: string, studentId: string) => void;
  onStudentAdd: (batchId: string, studentEmail: string) => void;
}

const BatchManagementDialog: React.FC<BatchManagementDialogProps> = ({
  open,
  onClose,
  courseName,
  batchName,
  batchId,
  students,
  onBatchNameChange,
  onStudentRemove,
  onStudentAdd,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [newBatchName, setNewBatchName] = useState(batchName);
  const [newStudentEmail, setNewStudentEmail] = useState("");

  const handleSaveBatchName = () => {
    if (newBatchName.trim() === "") {
      toast.error("Batch name cannot be empty");
      return;
    }
    
    onBatchNameChange(batchId, newBatchName);
    setIsEditingName(false);
    toast.success("Batch name updated");
  };

  const handleAddStudent = () => {
    if (newStudentEmail.trim() === "") {
      toast.error("Please enter a valid email");
      return;
    }
    
    if (!newStudentEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    onStudentAdd(batchId, newStudentEmail);
    setNewStudentEmail("");
    toast.success("Invitation sent to student");
  };

  const handleRemoveStudent = (studentId: string) => {
    onStudentRemove(batchId, studentId);
    toast.success("Student removed from batch");
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-green-600">{courseName}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Batch Name Section */}
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-gray-500">Batch Name</h3>
              {!isEditingName && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-green-600 hover:text-green-700"
                  onClick={() => setIsEditingName(true)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
            </div>
            
            {isEditingName ? (
              <div className="flex items-center gap-2 mt-2">
                <Input
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  className="h-9"
                  placeholder="Enter new batch name"
                  autoFocus
                />
                <Button 
                  size="sm" 
                  className="h-9 bg-green-600 hover:bg-green-700" 
                  onClick={handleSaveBatchName}
                >
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="font-medium text-lg mt-1">Batch {batchName}</div>
            )}
          </div>

          {/* Students List Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Students ({students.length})</h3>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div className="max-h-64 overflow-y-auto">
                {students.map((student) => (
                  <div 
                    key={student.id} 
                    className="flex items-center justify-between p-3 hover:bg-gray-50 border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center text-green-600 font-medium">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs text-gray-500">{student.email}</div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleRemoveStudent(student.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add Student Section */}
          <div className="bg-gray-50 p-3 rounded-md">
            <h3 className="text-sm font-medium mb-2">Add New Student</h3>
            <div className="flex items-center gap-2">
              <Input
                value={newStudentEmail}
                onChange={(e) => setNewStudentEmail(e.target.value)}
                placeholder="Enter student email"
                className="h-9"
              />
              <Button 
                size="sm" 
                className="h-9 bg-green-600 hover:bg-green-700 whitespace-nowrap" 
                onClick={handleAddStudent}
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <Button 
            className="w-full sm:w-auto mt-4 bg-green-600 hover:bg-green-700"
            onClick={onClose}
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BatchManagementDialog;
