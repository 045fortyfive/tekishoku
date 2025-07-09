"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider data-oid="1mst_ry">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} data-oid="h2z3u5_">
            <div className="grid gap-1" data-oid="e93d:y3">
              {title && <ToastTitle data-oid="fqprjaq">{title}</ToastTitle>}
              {description && (
                <ToastDescription data-oid="05ebbh6">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose data-oid="f55289." />
          </Toast>
        );
      })}
      <ToastViewport data-oid="k.g848f" />
    </ToastProvider>
  );
}
