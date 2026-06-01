import { Plus, Trash2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { usePortfolioStore } from '@/stores/portfolio.store';
import { generateId } from '@/lib/utils';
function Field({ label, children }) {
    return (<div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>);
}
function ListCard({ title, onRemove, children, }) {
    return (<div className="space-y-3 rounded-lg border border-border bg-muted/20 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium">{title}</span>
        <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={onRemove}>
          <Trash2 className="h-3.5 w-3.5 text-destructive"/>
        </Button>
      </div>
      {children}
    </div>);
}
export function ContentPanel() {
    const content = usePortfolioStore((s) => s.content);
    const updateContent = usePortfolioStore((s) => s.updateContent);
    if (!content)
        return null;
    const patch = (partial) => updateContent(partial);
    return (<div className="space-y-2">
      <p className="text-xs text-muted-foreground">Edit all portfolio sections. Changes sync to the preview.</p>

      <Accordion type="multiple" defaultValue={['hero', 'about', 'skills', 'experience', 'projects', 'education', 'certifications', 'contact']} className="w-full">
        <AccordionItem value="hero">
          <AccordionTrigger className="text-sm font-semibold">Hero</AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <Field label="Title">
              <Input value={content.hero.title} onChange={(e) => patch({ hero: { ...content.hero, title: e.target.value } })}/>
            </Field>
            <Field label="Subtitle">
              <Input value={content.hero.subtitle} onChange={(e) => patch({ hero: { ...content.hero, subtitle: e.target.value } })}/>
            </Field>
            <Field label="Tagline">
              <Input value={content.hero.tagline ?? ''} onChange={(e) => patch({ hero: { ...content.hero, tagline: e.target.value } })}/>
            </Field>
            <Field label="CTA text">
              <Input value={content.hero.ctaText ?? ''} onChange={(e) => patch({ hero: { ...content.hero, ctaText: e.target.value } })}/>
            </Field>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="about">
          <AccordionTrigger className="text-sm font-semibold">About</AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            <Field label="Heading">
              <Input value={content.about.heading} onChange={(e) => patch({ about: { ...content.about, heading: e.target.value } })}/>
            </Field>
            {content.about.paragraphs.map((para, i) => (<Field key={i} label={`Paragraph ${i + 1}`}>
                <Textarea value={para} rows={3} onChange={(e) => {
                const paragraphs = [...content.about.paragraphs];
                paragraphs[i] = e.target.value;
                patch({ about: { ...content.about, paragraphs } });
            }}/>
              </Field>))}
            <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => patch({
            about: { ...content.about, paragraphs: [...content.about.paragraphs, ''] },
        })}>
              <Plus className="mr-1 h-3 w-3"/> Add paragraph
            </Button>
            {(content.about.highlights ?? []).map((item, i) => (<Field key={i} label={`Highlight ${i + 1}`}>
                <div className="flex gap-2">
                  <Input value={item} onChange={(e) => {
                const highlights = [...(content.about.highlights ?? [])];
                highlights[i] = e.target.value;
                patch({ about: { ...content.about, highlights } });
            }}/>
                  <Button type="button" variant="ghost" size="icon" onClick={() => {
                const highlights = (content.about.highlights ?? []).filter((_, idx) => idx !== i);
                patch({ about: { ...content.about, highlights } });
            }}>
                    <Trash2 className="h-4 w-4"/>
                  </Button>
                </div>
              </Field>))}
            <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => patch({
            about: { ...content.about, highlights: [...(content.about.highlights ?? []), ''] },
        })}>
              <Plus className="mr-1 h-3 w-3"/> Add highlight
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills">
          <AccordionTrigger className="text-sm font-semibold">Skills</AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            {content.skills.map((cat, ci) => (<ListCard key={cat.id} title={cat.category || `Category ${ci + 1}`} onRemove={() => patch({ skills: content.skills.filter((_, i) => i !== ci) })}>
                <Field label="Category name">
                  <Input value={cat.category} onChange={(e) => {
                const skills = content.skills.map((c, i) => i === ci ? { ...c, category: e.target.value } : c);
                patch({ skills });
            }}/>
                </Field>
                <Field label="Skills (comma-separated)">
                  <Input value={cat.skills.join(', ')} onChange={(e) => {
                const skills = content.skills.map((c, i) => i === ci
                    ? {
                        ...c,
                        skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    }
                    : c);
                patch({ skills });
            }}/>
                </Field>
              </ListCard>))}
            <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => {
            const newCat = {
                id: generateId(),
                category: 'New Category',
                skills: [],
            };
            patch({ skills: [...content.skills, newCat] });
        }}>
              <Plus className="mr-1 h-3 w-3"/> Add skill category
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger className="text-sm font-semibold">Experience</AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            {content.experience.map((exp, ei) => (<ListCard key={exp.id} title={exp.position || `Role ${ei + 1}`} onRemove={() => patch({ experience: content.experience.filter((_, i) => i !== ei) })}>
                <Field label="Position">
                  <Input value={exp.position} onChange={(e) => updateExperience(content, patch, ei, { position: e.target.value })}/>
                </Field>
                <Field label="Company">
                  <Input value={exp.company} onChange={(e) => updateExperience(content, patch, ei, { company: e.target.value })}/>
                </Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Start">
                    <Input value={exp.startDate ?? ''} placeholder="2020-01" onChange={(e) => updateExperience(content, patch, ei, { startDate: e.target.value })}/>
                  </Field>
                  <Field label="End">
                    <Input value={exp.endDate ?? ''} placeholder="Present" disabled={exp.current} onChange={(e) => updateExperience(content, patch, ei, { endDate: e.target.value })}/>
                  </Field>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={exp.current ?? false} onCheckedChange={(checked) => updateExperience(content, patch, ei, { current: checked, endDate: checked ? undefined : exp.endDate })}/>
                  <Label className="text-xs">Current role</Label>
                </div>
                <Field label="Description">
                  <Textarea value={exp.description} rows={3} onChange={(e) => updateExperience(content, patch, ei, { description: e.target.value })}/>
                </Field>
                <Field label="Highlights (one per line)">
                  <Textarea value={(exp.highlights ?? []).join('\n')} rows={2} onChange={(e) => updateExperience(content, patch, ei, {
                highlights: e.target.value.split('\n').filter(Boolean),
            })}/>
                </Field>
                <Field label="Technologies (comma-separated)">
                  <Input value={(exp.technologies ?? []).join(', ')} onChange={(e) => updateExperience(content, patch, ei, {
                technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
            })}/>
                </Field>
              </ListCard>))}
            <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => {
            const entry = {
                id: generateId(),
                company: '',
                position: '',
                description: '',
                current: false,
            };
            patch({ experience: [...content.experience, entry] });
        }}>
              <Plus className="mr-1 h-3 w-3"/> Add experience
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="projects">
          <AccordionTrigger className="text-sm font-semibold">Projects</AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            {content.projects.map((proj, pi) => (<ListCard key={proj.id} title={proj.title || `Project ${pi + 1}`} onRemove={() => patch({ projects: content.projects.filter((_, i) => i !== pi) })}>
                <Field label="Title">
                  <Input value={proj.title} onChange={(e) => updateProject(content, patch, pi, { title: e.target.value })}/>
                </Field>
                <Field label="Description">
                  <Textarea value={proj.description} rows={2} onChange={(e) => updateProject(content, patch, pi, { description: e.target.value })}/>
                </Field>
                <Field label="Technologies (comma-separated)">
                  <Input value={(proj.technologies ?? []).join(', ')} onChange={(e) => updateProject(content, patch, pi, {
                technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
            })}/>
                </Field>
                <Field label="Project URL">
                  <Input value={proj.url ?? ''} onChange={(e) => updateProject(content, patch, pi, { url: e.target.value })}/>
                </Field>
                <Field label="GitHub URL">
                  <Input value={proj.githubUrl ?? ''} onChange={(e) => updateProject(content, patch, pi, { githubUrl: e.target.value })}/>
                </Field>
              </ListCard>))}
            <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => {
            const entry = { id: generateId(), title: '', description: '' };
            patch({ projects: [...content.projects, entry] });
        }}>
              <Plus className="mr-1 h-3 w-3"/> Add project
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education">
          <AccordionTrigger className="text-sm font-semibold">Education</AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            {content.education.map((edu, di) => (<ListCard key={edu.id} title={edu.institution || `School ${di + 1}`} onRemove={() => patch({ education: content.education.filter((_, i) => i !== di) })}>
                <Field label="Institution">
                  <Input value={edu.institution} onChange={(e) => updateEducation(content, patch, di, { institution: e.target.value })}/>
                </Field>
                <Field label="Degree">
                  <Input value={edu.degree} onChange={(e) => updateEducation(content, patch, di, { degree: e.target.value })}/>
                </Field>
                <Field label="Field of study">
                  <Input value={edu.field ?? ''} onChange={(e) => updateEducation(content, patch, di, { field: e.target.value })}/>
                </Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Start">
                    <Input value={edu.startDate ?? ''} onChange={(e) => updateEducation(content, patch, di, { startDate: e.target.value })}/>
                  </Field>
                  <Field label="End">
                    <Input value={edu.endDate ?? ''} onChange={(e) => updateEducation(content, patch, di, { endDate: e.target.value })}/>
                  </Field>
                </div>
                <Field label="GPA">
                  <Input value={edu.gpa ?? ''} onChange={(e) => updateEducation(content, patch, di, { gpa: e.target.value })}/>
                </Field>
                <Field label="Description">
                  <Textarea value={edu.description ?? ''} rows={2} onChange={(e) => updateEducation(content, patch, di, { description: e.target.value })}/>
                </Field>
              </ListCard>))}
            <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => {
            const entry = { id: generateId(), institution: '', degree: '' };
            patch({ education: [...content.education, entry] });
        }}>
              <Plus className="mr-1 h-3 w-3"/> Add education
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="certifications">
          <AccordionTrigger className="text-sm font-semibold">Certifications</AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            {content.certifications.map((cert, ci) => (<ListCard key={cert.id} title={cert.name || `Certification ${ci + 1}`} onRemove={() => patch({ certifications: content.certifications.filter((_, i) => i !== ci) })}>
                <Field label="Name">
                  <Input value={cert.name} onChange={(e) => updateCert(content, patch, ci, { name: e.target.value })}/>
                </Field>
                <Field label="Issuer">
                  <Input value={cert.issuer} onChange={(e) => updateCert(content, patch, ci, { issuer: e.target.value })}/>
                </Field>
                <Field label="Date">
                  <Input value={cert.date ?? ''} onChange={(e) => updateCert(content, patch, ci, { date: e.target.value })}/>
                </Field>
                <Field label="Credential ID">
                  <Input value={cert.credentialId ?? ''} onChange={(e) => updateCert(content, patch, ci, { credentialId: e.target.value })}/>
                </Field>
                <Field label="URL">
                  <Input value={cert.url ?? ''} onChange={(e) => updateCert(content, patch, ci, { url: e.target.value })}/>
                </Field>
              </ListCard>))}
            <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => {
            const entry = { id: generateId(), name: '', issuer: '' };
            patch({ certifications: [...content.certifications, entry] });
        }}>
              <Plus className="mr-1 h-3 w-3"/> Add certification
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="contact">
          <AccordionTrigger className="text-sm font-semibold">Contact</AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            {['email', 'phone', 'location', 'website', 'github', 'linkedin'].map((field) => (<Field key={field} label={field}>
                <Input value={content.contact[field] ?? ''} onChange={(e) => patch({ contact: { ...content.contact, [field]: e.target.value } })}/>
              </Field>))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>);
}
function updateExperience(content, patch, index, updates) {
    const experience = content.experience.map((e, i) => (i === index ? { ...e, ...updates } : e));
    patch({ experience });
}
function updateProject(content, patch, index, updates) {
    const projects = content.projects.map((p, i) => (i === index ? { ...p, ...updates } : p));
    patch({ projects });
}
function updateEducation(content, patch, index, updates) {
    const education = content.education.map((e, i) => (i === index ? { ...e, ...updates } : e));
    patch({ education });
}
function updateCert(content, patch, index, updates) {
    const certifications = content.certifications.map((c, i) => (i === index ? { ...c, ...updates } : c));
    patch({ certifications });
}
