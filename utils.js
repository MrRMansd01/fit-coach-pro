import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function createPageUrl(pageName) {
  const routes = {
    ClientDashboard: '/client-dashboard',
    CoachDashboard: '/coach-dashboard',
    CoachMarketplace: '/coach-marketplace',
    AICoach: '/ai-coach',
    WorkoutExecution: '/workout-execution',
    Messages: '/messages',
    CoachProfile: '/coach-profile',
    ClientManagement: '/client-management',
    ProgramBuilder: '/program-builder',
  };
  
  return routes[pageName] || '/';
}