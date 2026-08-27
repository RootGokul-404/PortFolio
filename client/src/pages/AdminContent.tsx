import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, Save, ShieldAlert, Trash2 } from "lucide-react";
import { FormEvent } from "react";
import { toast } from "sonner";

export default function AdminContent() {
  const { user, loading } = useAuth();
  const query = trpc.admin.get.useQuery(undefined, { enabled: Boolean(user?.role === "admin") });
  const utils = trpc.useUtils();
  const refresh = () => utils.admin.get.invalidate();
  const profile = trpc.admin.updateProfile.useMutation({ onSuccess: () => { toast.success("Profile saved."); refresh(); }, onError: () => toast.error("Profile could not be saved.") });
  const saveProject = trpc.admin.saveProject.useMutation({ onSuccess: () => { toast.success("Project saved."); refresh(); }, onError: () => toast.error("Project could not be saved.") });
  const removeProject = trpc.admin.deleteProject.useMutation({ onSuccess: refresh, onError: () => toast.error("Project could not be deleted.") });
  const saveSkill = trpc.admin.saveSkill.useMutation({ onSuccess: () => { toast.success("Skill saved."); refresh(); }, onError: () => toast.error("Skill could not be saved.") });
  const removeSkill = trpc.admin.deleteSkill.useMutation({ onSuccess: refresh, onError: () => toast.error("Skill could not be deleted.") });
  const saveArticle = trpc.admin.saveArticle.useMutation({ onSuccess: () => { toast.success("Article saved."); refresh(); }, onError: () => toast.error("Article could not be saved.") });
  const removeArticle = trpc.admin.deleteArticle.useMutation({ onSuccess: refresh, onError: () => toast.error("Article could not be deleted.") });
  const saveDetail = trpc.admin.saveDetail.useMutation({ onSuccess: () => { toast.success("Profile detail saved."); refresh(); }, onError: () => toast.error("Profile detail could not be saved.") });
  const removeDetail = trpc.admin.deleteDetail.useMutation({ onSuccess: refresh, onError: () => toast.error("Profile detail could not be deleted.") });

  return (
    <DashboardLayout>
      <div className="admin-shell content-shell">
        {loading || query.isLoading ? (
          <Loading />
        ) : user?.role !== "admin" || query.isError ? (
          <Denied />
        ) : query.data?.profile && (
          <>
            <div className="admin-header">
              <div>
                <p className="eyebrow">Owner console / website</p>
                <h1>Portfolio content</h1>
                <p>Edit every published profile, project, skill, writing note, and narrative detail.</p>
              </div>
            </div>
            <section className="editor-section">
              <h2>Profile</h2>
              <ProfileForm profile={query.data.profile} onSubmit={profile.mutate} pending={profile.isPending} />
            </section>
            <section className="editor-section">
              <SectionTitle title="Projects" />
              <div className="editor-grid">
                {query.data.projects.map((item) => (
                  <ProjectForm key={item.id} item={item} onSubmit={saveProject.mutate} onDelete={() => removeProject.mutate({ id: item.id })} />
                ))}
                <ProjectForm onSubmit={saveProject.mutate} />
              </div>
            </section>
            <section className="editor-section">
              <SectionTitle title="Skills" />
              <div className="editor-grid compact-grid">
                {query.data.skills.map((item) => (
                  <SkillForm key={item.id} item={item} onSubmit={saveSkill.mutate} onDelete={() => removeSkill.mutate({ id: item.id })} />
                ))}
                <SkillForm onSubmit={saveSkill.mutate} />
              </div>
            </section>
            <section className="editor-section">
              <SectionTitle title="Writing" />
              <div className="editor-grid">
                {query.data.articles.map((item) => (
                  <ArticleForm key={item.id} item={item} onSubmit={saveArticle.mutate} onDelete={() => removeArticle.mutate({ id: item.id })} />
                ))}
                <ArticleForm onSubmit={saveArticle.mutate} />
              </div>
            </section>
            <section className="editor-section">
              <SectionTitle title="Narrative details" />
              <div className="editor-grid compact-grid">
                {query.data.details.map((item) => (
                  <DetailForm key={item.id} item={item} onSubmit={saveDetail.mutate} onDelete={() => removeDetail.mutate({ id: item.id })} />
                ))}
                <DetailForm onSubmit={saveDetail.mutate} />
              </div>
            </section>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

function Field({ label, name, defaultValue = "", type = "text", required = false }: { label: string; name: string; defaultValue?: string | number; type?: string; required?: boolean }) {
  return (
    <label className="editor-field">
      <span>{label}</span>
      <input name={name} type={type} defaultValue={defaultValue} />
    </label>
  );
}

function Area({ label, name, defaultValue = "", required = false }: { label: string; name: string; defaultValue?: string; required?: boolean }) {
  return (
    <label className="editor-field editor-area">
      <span>{label}</span>
      <textarea name={name} defaultValue={defaultValue} rows={4} />
    </label>
  );
}

function FormActions({ canDelete, onDelete }: { canDelete?: boolean; onDelete?: () => void }) {
  return (
    <div className="editor-actions">
      <Button type="submit" size="sm">
        <Save className="h-3.5 w-3.5" />
        Save
      </Button>
      {canDelete && (
        <Button type="button" size="sm" variant="outline" onClick={onDelete}>
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      )}
    </div>
  );
}

function read(form: HTMLFormElement, key: string) {
  return String(new FormData(form).get(key) || "").trim();
}

function bool(form: HTMLFormElement, key: string) {
  return new FormData(form).get(key) === "on";
}

function number(form: HTMLFormElement, key: string) {
  return Number(new FormData(form).get(key) || 0);
}

function ProfileForm({ profile, onSubmit, pending }: any) {
  return (
    <form
      noValidate
      className="editor-card profile-editor"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const displayName = read(form, "displayName");
        const role = read(form, "role");
        const intro = read(form, "intro");
        const about = read(form, "about");
        if (!displayName || !role || !intro || !about) {
          toast.error("Please fill in Name, Role, Intro, and About.");
          return;
        }
        onSubmit({
          displayName,
          handle: read(form, "handle"),
          role,
          intro,
          about,
          location: read(form, "location"),
          email: read(form, "email"),
          githubUrl: read(form, "githubUrl"),
          linkedinUrl: read(form, "linkedinUrl"),
          instagramUrl: read(form, "instagramUrl"),
          resumeUrl: read(form, "resumeUrl"),
        });
      }}
    >
      <div className="editor-grid">
        <Field label="Name" name="displayName" defaultValue={profile.displayName} required />
        <Field label="Handle" name="handle" defaultValue={profile.handle || ""} />
        <Field label="Role" name="role" defaultValue={profile.role} required />
        <Field label="Location" name="location" defaultValue={profile.location || ""} />
        <Field label="Email" name="email" type="email" defaultValue={profile.email || ""} />
        <Field label="GitHub URL" name="githubUrl" defaultValue={profile.githubUrl || ""} />
        <Field label="LinkedIn URL" name="linkedinUrl" defaultValue={profile.linkedinUrl || ""} />
        <Field label="Instagram URL" name="instagramUrl" defaultValue={profile.instagramUrl || ""} />
        <Field label="Resume URL" name="resumeUrl" defaultValue={profile.resumeUrl || ""} />
      </div>
      <Area label="Intro" name="intro" defaultValue={profile.intro} required />
      <Area label="About" name="about" defaultValue={profile.about} required />
      <Button type="submit" disabled={pending}>
        <Save className="h-4 w-4" />
        Save profile
      </Button>
    </form>
  );
}

function ProjectForm({ item, onSubmit, onDelete }: any) {
  return (
    <form
      noValidate
      className="editor-card"
      onSubmit={(event) => {
        event.preventDefault();
        const f = event.currentTarget;
        const title = read(f, "title");
        const slug = read(f, "slug");
        const category = read(f, "category");
        const summary = read(f, "summary");
        if (!title || !slug || !category || !summary) {
          toast.error("Please fill in Title, Slug, Category, and Summary.");
          return;
        }
        onSubmit({
          id: item?.id,
          slug,
          title,
          summary,
          category,
          techStack: read(f, "techStack"),
          liveUrl: read(f, "liveUrl"),
          repoUrl: read(f, "repoUrl"),
          featured: bool(f, "featured"),
          sortOrder: number(f, "sortOrder"),
        });
      }}
    >
      <h3>{item ? "Edit project" : "Add project"}</h3>
      <Field label="Title" name="title" defaultValue={item?.title} required />
      <Field label="Slug" name="slug" defaultValue={item?.slug} required />
      <Field label="Category" name="category" defaultValue={item?.category} required />
      <Field label="Order" name="sortOrder" type="number" defaultValue={item?.sortOrder || 0} />
      <Area label="Summary" name="summary" defaultValue={item?.summary} required />
      <Area label="Tech stack (JSON array)" name="techStack" defaultValue={item?.techStack || '["Java"]'} required />
      <Field label="Live URL" name="liveUrl" defaultValue={item?.liveUrl || ""} />
      <Field label="Repository URL" name="repoUrl" defaultValue={item?.repoUrl || ""} />
      <label className="editor-check">
        <input name="featured" type="checkbox" defaultChecked={item?.featured} /> Featured
      </label>
      <FormActions canDelete={Boolean(item)} onDelete={onDelete} />
    </form>
  );
}

function SkillForm({ item, onSubmit, onDelete }: any) {
  return (
    <form
      noValidate
      className="editor-card compact-card"
      onSubmit={(event) => {
        event.preventDefault();
        const f = event.currentTarget;
        const name = read(f, "name");
        const category = read(f, "category");
        if (!name || !category) {
          toast.error("Please fill in Name and Category.");
          return;
        }
        onSubmit({
          id: item?.id,
          name,
          category,
          proficiency: number(f, "proficiency"),
          sortOrder: number(f, "sortOrder"),
        });
      }}
    >
      <h3>{item ? "Edit skill" : "Add skill"}</h3>
      <Field label="Name" name="name" defaultValue={item?.name} required />
      <Field label="Category" name="category" defaultValue={item?.category} required />
      <Field label="Proficiency" name="proficiency" type="number" defaultValue={item?.proficiency || 50} />
      <Field label="Order" name="sortOrder" type="number" defaultValue={item?.sortOrder || 0} />
      <FormActions canDelete={Boolean(item)} onDelete={onDelete} />
    </form>
  );
}

function ArticleForm({ item, onSubmit, onDelete }: any) {
  return (
    <form
      noValidate
      className="editor-card"
      onSubmit={(event) => {
        event.preventDefault();
        const f = event.currentTarget;
        const title = read(f, "title");
        const slug = read(f, "slug");
        const excerpt = read(f, "excerpt");
        if (!title || !slug || !excerpt) {
          toast.error("Please fill in Title, Slug, and Excerpt.");
          return;
        }
        const date = read(f, "publishedAt");
        onSubmit({
          id: item?.id,
          slug,
          title,
          excerpt,
          tags: read(f, "tags"),
          readTime: read(f, "readTime"),
          url: read(f, "url"),
          publishedAt: date ? new Date(`${date}T00:00:00`) : undefined,
        });
      }}
    >
      <h3>{item ? "Edit article" : "Add article"}</h3>
      <Field label="Title" name="title" defaultValue={item?.title} required />
      <Field label="Slug" name="slug" defaultValue={item?.slug} required />
      <Field label="Read time" name="readTime" defaultValue={item?.readTime || ""} />
      <Field label="Published date" name="publishedAt" type="date" defaultValue={item?.publishedAt ? new Date(item.publishedAt).toISOString().slice(0, 10) : ""} />
      <Field label="Article URL" name="url" defaultValue={item?.url || ""} />
      <Area label="Excerpt" name="excerpt" defaultValue={item?.excerpt} required />
      <Area label="Tags (JSON array)" name="tags" defaultValue={item?.tags || '["Engineering"]'} required />
      <FormActions canDelete={Boolean(item)} onDelete={onDelete} />
    </form>
  );
}

function DetailForm({ item, onSubmit, onDelete }: any) {
  return (
    <form
      noValidate
      className="editor-card compact-card"
      onSubmit={(event) => {
        event.preventDefault();
        const f = event.currentTarget;
        const section = read(f, "section");
        const label = read(f, "label");
        if (!section || !label) {
          toast.error("Please fill in Section and Label.");
          return;
        }
        onSubmit({
          id: item?.id,
          section,
          label,
          content: read(f, "content"),
          sortOrder: number(f, "sortOrder"),
        });
      }}
    >
      <h3>{item ? "Edit detail" : "Add detail"}</h3>
      <Field label="Section" name="section" defaultValue={item?.section} required />
      <Field label="Label" name="label" defaultValue={item?.label} required />
      <Field label="Order" name="sortOrder" type="number" defaultValue={item?.sortOrder || 0} />
      <Area label="Content" name="content" defaultValue={item?.content} />
      <FormActions canDelete={Boolean(item)} onDelete={onDelete} />
    </form>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="editor-title">
      <h2>{title}</h2>
      <p>Update existing records or add a new one.</p>
    </div>
  );
}

function Loading() {
  return (
    <div className="admin-loading">
      <Loader2 className="h-5 w-5 animate-spin" />
      Loading secure editor…
    </div>
  );
}

function Denied() {
  return (
    <div className="admin-denied">
      <ShieldAlert className="h-7 w-7" />
      <h1>Owner access required</h1>
      <p>Sign in with the project owner account to edit portfolio content.</p>
      <Button asChild>
        <a href="/">Return to portfolio</a>
      </Button>
    </div>
  );
}
