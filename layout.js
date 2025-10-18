import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import {
  Dumbbell,
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  Sparkles,
  Store,
  Activity,
  Menu,
  X
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
    staleTime: 300000,
  });

  const isCoach = user?.role === 'admin' || user?.coach_status === 'verified';

  const coachNavigation = [
    {
      title: "Dashboard",
      url: createPageUrl("CoachDashboard"),
      icon: LayoutDashboard,
    },
    {
      title: "My Clients",
      url: createPageUrl("ClientManagement"),
      icon: Users,
    },
    {
      title: "Programs",
      url: createPageUrl("ProgramBuilder"),
      icon: Calendar,
    },
    {
      title: "Messages",
      url: createPageUrl("Messages"),
      icon: MessageSquare,
    },
  ];

  const clientNavigation = [
    {
      title: "My Workouts",
      url: createPageUrl("ClientDashboard"),
      icon: Activity,
    },
    {
      title: "Find a Coach",
      url: createPageUrl("CoachMarketplace"),
      icon: Store,
    },
    {
      title: "AI Coach",
      url: createPageUrl("AICoach"),
      icon: Sparkles,
    },
    {
      title: "Messages",
      url: createPageUrl("Messages"),
      icon: MessageSquare,
    },
  ];

  const navigation = isCoach ? coachNavigation : clientNavigation;

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --primary: 222 47% 45%;
          --primary-foreground: 210 40% 98%;
          --secondary: 24 95% 53%;
          --secondary-foreground: 0 0% 100%;
          --accent: 160 84% 39%;
          --accent-foreground: 0 0% 100%;
        }
      `}</style>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <Sidebar className="border-r border-slate-200/60 backdrop-blur-sm bg-white/80">
          <SidebarHeader className="border-b border-slate-200/60 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">FitCoach</h2>
                <p className="text-xs text-slate-500">
                  {isCoach ? 'Coach Portal' : 'Train Smarter'}
                </p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-xl mb-1 ${
                          location.pathname === item.url ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {isCoach && (
              <SidebarGroup className="mt-4">
                <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                  Settings
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        asChild 
                        className="hover:bg-slate-100 transition-colors duration-200 rounded-xl"
                      >
                        <Link to={createPageUrl("CoachProfile")} className="flex items-center gap-3 px-4 py-3">
                          <Settings className="w-5 h-5" />
                          <span className="font-medium">My Profile</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200/60 p-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 border-2 border-blue-100">
                <AvatarImage src={user?.profile_image} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                  {user?.full_name?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">{user?.full_name || 'User'}</p>
                <div className="flex items-center gap-1">
                  {isCoach ? (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                      Coach
                    </Badge>
                  ) : (
                    <p className="text-xs text-slate-500 truncate">Member</p>
                  )}
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 px-6 py-4 md:hidden sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-blue-600" />
                <h1 className="text-lg font-bold text-slate-900">FitCoach</h1>
              </div>
              <div className="w-10" />
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}