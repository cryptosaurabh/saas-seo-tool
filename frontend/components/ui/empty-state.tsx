import * as React from "react";
import { Button } from "./button";
import { FolderOpen } from "lucide-react";

export function EmptyState({
  title = "No data found",
  description = "Get started by creating your first entry.",
  actionLabel,
  onAction,
  icon: Icon = FolderOpen
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ElementType;
}) {
  return (
    <div className="p-12 text-center rounded-2xl border border-dashed border-border bg-card/20 space-y-4 max-w-md mx-auto">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-bold text-sm text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function Pagination({
  currentPage = 1,
  totalPages = 5,
  onPageChange
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
      <div>Showing Page <span className="font-bold text-foreground">{currentPage}</span> of {totalPages}</div>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
