import { useContext } from 'react';
import {
  ProgressContext,
  ProgressContextType,
} from '../context/ProgressContext';

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export default useProgress;