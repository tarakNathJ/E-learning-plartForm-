
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AudioRecorderProps {
  onSave: (audioBlob: Blob) => void;
  onCancel: () => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onSave, onCancel }) => {
  const [recording, setRecording] = useState<boolean>(true);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  
  useEffect(() => {
    // Start recording when component mounts
    let chunks: Blob[] = [];
    
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        
        recorder.ondataavailable = (e) => {
          chunks.push(e.data);
          setAudioChunks([...chunks]);
        };
        
        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/mp3' });
          onSave(audioBlob);
          chunks = [];
        };
        
        recorder.start();
        setMediaRecorder(recorder);
        toast.info("Recording started");
        
        return () => {
          if (recorder.state !== 'inactive') {
            recorder.stop();
          }
          stream.getTracks().forEach(track => track.stop());
        };
      })
      .catch(err => {
        toast.error("Error accessing microphone");
        console.error("Error accessing microphone:", err);
        onCancel();
      });
      
    // Timer for recording duration
    const timer = setInterval(() => {
      setRecordingTime(prevTime => prevTime + 1);
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, [onSave, onCancel]);
  
  const handleStop = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setRecording(false);
    }
  };
  
  const handleCancel = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    onCancel();
  };
  
  // Format recording time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center">
        <div className="text-lg font-medium text-red-600">Recording voice message</div>
        <div className="text-2xl font-bold">{formatTime(recordingTime)}</div>
      </div>
      
      <div className="flex space-x-4">
        <Button 
          variant="outline" 
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button 
          variant="default"
          className="bg-red-600 hover:bg-red-700"
          onClick={handleStop}
        >
          Stop Recording
        </Button>
      </div>
    </div>
  );
};

export default AudioRecorder;
