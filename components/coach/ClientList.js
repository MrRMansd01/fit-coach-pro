import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function ClientList({ programs }) {
  const activePrograms = programs.filter(p => p.status === 'active');

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Users className="w-6 h-6 text-blue-600" />
          Active Clients
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activePrograms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 mb-4">No active clients yet</p>
            <Link to={createPageUrl("CoachProfile")}>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700">
                Complete Your Profile
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {activePrograms.map((program) => (
              <div 
                key={program.id}
                className="p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">{program.name}</h3>
                    <p className="text-sm text-slate-600">Client ID: {program.client_id.slice(0, 8)}...</p>
                  </div>
                  <Link to={`${createPageUrl("ClientManagement")}?client_id=${program.client_id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}