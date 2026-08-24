"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FolderKanban, 
  Search, 
  Filter, 
  Plus, 
  Globe, 
  MoreVertical, 
  Copy, 
  Archive, 
  Trash2, 
  Edit, 
  ExternalLink,
  Calendar,
  User,
  X
} from "lucide-react";

export interface ProjectItem {
  id: string;
  name: string;
  targetDomain: string;
  industry: string;
  country: string;
  language: string;
  targetKeywords: number;
  status: "Active" | "Archived" | "Pending";
  owner: string;
  createdDate: string;
  lastAudit: string;
}

export function ProjectManager() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newDomain, setNewDomain] = useState("");
  const [newIndustry, setNewIndustry] = useState("SaaS & Tech");

  const [projects, setProjects] = useState<ProjectItem[]>([]);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase()) || p.targetDomain.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newProj: ProjectItem = {
      id: Date.now().toString(),
      name: newProjectName,
      targetDomain: newDomain,
      industry: newIndustry,
      country: "United States",
      language: "English",
      targetKeywords: 100,
      status: "Active",
      owner: "Alex Mercer",
      createdDate: "Just now",
      lastAudit: "Pending"
    };
    setProjects([newProj, ...projects]);
    setNewProjectName("");
    setNewDomain("");
    setIsCreateModalOpen(false);
  };

  const handleDuplicate = (id: string) => {
    const target = projects.find((p) => p.id === id);
    if (!target) return;
    const duplicated: ProjectItem = {
      ...target,
      id: Date.now().toString(),
      name: `${target.name} (Copy)`
    };
    setProjects([duplicated, ...projects]);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Action Controls Bar */}
      <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <Input
            placeholder="Search projects by name or domain..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-lg border border-input bg-background px-3 text-xs focus:outline-none text-foreground"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2 shrink-0">
          <Plus className="w-4 h-4" /> New Project
        </Button>
      </Card>

      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-popover p-6 shadow-2xl glass-panel space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-foreground">Create New SEO Project</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Project Name</label>
                <Input
                  placeholder="e.g. Acme SaaS Portal"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Target Domain URL</label>
                <Input
                  placeholder="https://example.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  icon={<Globe className="w-4 h-4" />}
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                <Button type="submit">Save Project</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects Data Table */}
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-4 font-semibold">Project & Domain</th>
              <th className="p-4 font-semibold">Industry</th>
              <th className="p-4 font-semibold">Keywords</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Last Audit</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  <FolderKanban className="w-8 h-8 mx-auto mb-2 text-muted-foreground/60" />
                  <div className="font-semibold text-sm text-foreground">No projects found</div>
                  <p className="text-xs text-muted-foreground mt-0.5">Click "+ New Project" to add your first SEO project.</p>
                </td>
              </tr>
            ) : (
              filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-accent/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                        <FolderKanban className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-sm">{p.name}</div>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Globe className="w-3 h-3 text-muted-foreground" /> {p.targetDomain}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground font-medium">{p.industry}</td>
                  <td className="p-4 font-bold text-foreground">{p.targetKeywords} Keywords</td>
                  <td className="p-4">
                    <Badge variant={p.status === "Active" ? "success" : "secondary"}>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted-foreground">{p.lastAudit}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleDuplicate(p.id)} title="Duplicate">
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} title="Delete">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
