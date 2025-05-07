
import React from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Course {
  id: string;
  name: string;
}

interface Batch {
  id: string;
  name: string;
  course: string;
}

interface BatchSelectorProps {
  courses: Course[];
  batches: Record<string, Batch[]>;
  selectedCourse: string;
  selectedBatch: string;
  onCourseChange: (courseId: string) => void;
  onBatchChange: (batchId: string) => void;
  onBatchManage?: (batchId: string) => void;
}

const BatchSelector: React.FC<BatchSelectorProps> = ({
  courses,
  batches,
  selectedCourse,
  selectedBatch,
  onCourseChange,
  onBatchChange,
  onBatchManage
}) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Course</label>
        <Select value={selectedCourse} onValueChange={onCourseChange}>
          <SelectTrigger className="w-full bg-white border-gray-200">
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.id} className="cursor-pointer">
                {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedCourse && (
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Batch</label>
          <div className="space-y-1.5">
            {batches[selectedCourse]?.map((batch) => (
              <div 
                key={batch.id}
                className={`px-3 py-2 rounded-md cursor-pointer text-sm transition-colors ${
                  selectedBatch === batch.id 
                    ? 'bg-green-100 text-green-800 font-medium' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div 
                  className="font-medium"
                  onClick={() => onBatchChange(batch.id)}
                >
                  Batch {batch.name}
                </div>
                <div 
                  className="text-xs text-gray-500 flex justify-between items-center"
                >
                  <span>
                    {/* Use real student count from the batch object if available */}
                    {Math.floor(Math.random() * 20) + 5} students
                  </span>
                  {selectedBatch === batch.id && onBatchManage && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onBatchManage(batch.id);
                      }}
                      className="text-green-600 hover:text-green-800 text-xs font-medium"
                    >
                      Manage
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchSelector;
