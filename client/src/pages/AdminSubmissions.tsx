import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Inbox, Loader2, Mail, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

const statuses = ["new", "read", "archived"] as const;

export default function AdminSubmissions() {
  const { user, loading } = useAuth();
  const query = trpc.admin.get.useQuery(undefined, { enabled: Boolean(user?.role === "admin") });
  const utils = trpc.useUtils();
  const updateStatus = trpc.admin.updateSubmissionStatus.useMutation({
    onSuccess: () => {
      toast.success("Submission status updated.");
      utils.admin.get.invalidate();
    },
    onError: () => toast.error("The submission status could not be updated."),
  });

  return (
    <DashboardLayout>
      <div className="admin-shell">
        {loading ? <LoadingState /> : user?.role !== "admin" ? <AccessDenied /> : query.isLoading ? <LoadingState /> : query.isError ? <AccessDenied /> : <>
          <div className="admin-header"><div><p className="eyebrow">Owner console / inbound</p><h1>Contact submissions</h1><p>Every message is stored before the email notification is sent.</p></div><div className="admin-stat"><Inbox className="h-4 w-4" /><span>{query.data?.submissions.length || 0} total</span></div></div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Contact</th><th>Message</th><th>Received</th><th>Status</th></tr></thead>
              <tbody>{query.data?.submissions.map(submission => <tr key={submission.id}>
                <td><strong>{submission.name}</strong><a href={`mailto:${submission.email}`}><Mail className="h-3.5 w-3.5" />{submission.email}</a>{submission.company && <small>{submission.company}</small>}</td>
                <td className="submission-message">{submission.message}</td>
                <td className="font-mono text-xs text-slate-500">{new Date(submission.createdAt).toLocaleString()}</td>
                <td><div className="status-control"><Badge className={`status-badge status-${submission.status}`}>{submission.status}</Badge><select value={submission.status} disabled={updateStatus.isPending} onChange={event => updateStatus.mutate({ id: submission.id, status: event.target.value as typeof statuses[number] })}>{statuses.map(status => <option key={status} value={status}>{status}</option>)}</select></div></td>
              </tr>)}</tbody>
            </table>
            {query.data?.submissions.length === 0 && <div className="admin-empty">No contact submissions have been received yet.</div>}
          </div>
        </>}
      </div>
    </DashboardLayout>
  );
}

function LoadingState() { return <div className="admin-loading"><Loader2 className="h-5 w-5 animate-spin" />Loading secure dashboard…</div>; }
function AccessDenied() { return <div className="admin-denied"><ShieldAlert className="h-7 w-7" /><h1>Owner access required</h1><p>Sign in with the project owner account to view contact submissions.</p><Button asChild><a href="/">Return to portfolio</a></Button></div>; }
