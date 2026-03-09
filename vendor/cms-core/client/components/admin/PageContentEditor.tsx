import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Plus, Trash2, GripVertical } from "lucide-react";
import type {
  HomePageContent,
  AboutPageContent,
  ContactPageContent,
  PracticeAreasPageContent,
} from "../../lib/pageContentTypes";
import ImageUploader from "./ImageUploader";
import RichTextEditor from "./RichTextEditor";

interface PageContentEditorProps {
  pageKey: string;
  content: unknown;
  onChange: (content: unknown) => void;
}

// Collapsible section component
function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50">
            <CardTitle className="flex items-center justify-between text-lg">
              {title}
              <ChevronDown
                className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-4">{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

// Array item editor
function ArrayEditor<T extends Record<string, unknown>>({
  items = [],
  onChange,
  renderItem,
  newItem,
  itemLabel = "Item",
}: {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (
    item: T,
    index: number,
    update: (item: T) => void,
  ) => React.ReactNode;
  newItem: () => T;
  itemLabel?: string;
}) {
  const addItem = () => {
    onChange([...items, newItem()]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, item: T) => {
    const newItems = [...items];
    newItems[index] = item;
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="relative border rounded-lg p-4 bg-gray-50">
          <div className="absolute top-2 right-2 flex gap-2">
            <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="text-sm font-medium text-gray-500 mb-3">
            {itemLabel} {index + 1}
          </div>
          {renderItem(item, index, (updated) => updateItem(index, updated))}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={addItem}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add {itemLabel}
      </Button>
    </div>
  );
}

// Home Page Editor
function HomePageEditor({
  content,
  onChange,
}: {
  content: HomePageContent;
  onChange: (c: HomePageContent) => void;
}) {
  const update = <K extends keyof HomePageContent>(
    key: K,
    value: HomePageContent[K],
  ) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-6">
      <Section title="Hero Section">
        <div className="grid gap-4">
          <div>
            <Label>H1 Title</Label>
            <Input
              value={content?.hero?.h1Title ?? ""}
              onChange={(e) =>
                update("hero", { ...content.hero, h1Title: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Headline</Label>
            <Input
              value={content?.hero?.headline ?? ""}
              onChange={(e) =>
                update("hero", { ...content.hero, headline: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Highlighted Text</Label>
            <Input
              value={content?.hero?.highlightedText ?? ""}
              onChange={(e) =>
                update("hero", { ...content.hero, highlightedText: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Phone</Label>
              <Input
                value={content?.hero?.phone ?? ""}
                onChange={(e) =>
                  update("hero", { ...content.hero, phone: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Phone Label</Label>
              <Input
                value={content?.hero?.phoneLabel ?? ""}
                onChange={(e) =>
                  update("hero", { ...content.hero, phoneLabel: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Partner Logos" defaultOpen={false}>
        <ArrayEditor
          items={content?.partnerLogos ?? []}
          onChange={(items) => update("partnerLogos", items)}
          itemLabel="Logo"
          newItem={() => ({ src: "", alt: "" })}
          renderItem={(item, _, updateItem) => (
            <div className="grid gap-3">
              <ImageUploader
                value={item.src}
                onChange={(url) => updateItem({ ...item, src: url })}
              />
              <Input
                placeholder="Alt text"
                value={item.alt}
                onChange={(e) => updateItem({ ...item, alt: e.target.value })}
              />
            </div>
          )}
        />
      </Section>

      <Section title="About Section" defaultOpen={false}>
        <div className="grid gap-4">
          <div>
            <Label>Section Label</Label>
            <Input
              value={content?.about?.sectionLabel ?? ""}
              onChange={(e) => update("about", { ...content.about, sectionLabel: e.target.value })}
            />
          </div>
          <div>
            <Label>Heading</Label>
            <Input
              value={content?.about?.heading ?? ""}
              onChange={(e) => update("about", { ...content.about, heading: e.target.value })}
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor
              content={content?.about?.description ?? ""}
              onChange={(val) => update("about", { ...content.about, description: val })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Phone</Label>
              <Input
                value={content?.about?.phone ?? ""}
                onChange={(e) => update("about", { ...content.about, phone: e.target.value })}
              />
            </div>
            <div>
              <Label>Phone Label</Label>
              <Input
                value={content?.about?.phoneLabel ?? ""}
                onChange={(e) => update("about", { ...content.about, phoneLabel: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Contact Label</Label>
              <Input
                value={content?.about?.contactLabel ?? ""}
                onChange={(e) => update("about", { ...content.about, contactLabel: e.target.value })}
              />
            </div>
            <div>
              <Label>Contact Text</Label>
              <Input
                value={content?.about?.contactText ?? ""}
                onChange={(e) => update("about", { ...content.about, contactText: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label>Attorney Image</Label>
            <ImageUploader
              value={content?.about?.attorneyImage ?? ""}
              onChange={(url) => update("about", { ...content.about, attorneyImage: url })}
            />
          </div>
          <div>
            <Label>Attorney Image Alt</Label>
            <Input
              value={content?.about?.attorneyImageAlt ?? ""}
              onChange={(e) => update("about", { ...content.about, attorneyImageAlt: e.target.value })}
            />
          </div>
          <Label>Features</Label>
          <ArrayEditor
            items={content?.about?.features ?? []}
            onChange={(items) => update("about", { ...content.about, features: items })}
            itemLabel="Feature"
            newItem={() => ({ number: "", title: "", description: "" })}
            renderItem={(item, _, updateItem) => (
              <div className="grid gap-3">
                <Input placeholder="Number" value={item.number} onChange={(e) => updateItem({ ...item, number: e.target.value })} />
                <Input placeholder="Title" value={item.title} onChange={(e) => updateItem({ ...item, title: e.target.value })} />
                <Textarea placeholder="Description" value={item.description} onChange={(e) => updateItem({ ...item, description: e.target.value })} />
              </div>
            )}
          />
          <Label>Stats</Label>
          <ArrayEditor
            items={content?.about?.stats ?? []}
            onChange={(items) => update("about", { ...content.about, stats: items })}
            itemLabel="Stat"
            newItem={() => ({ value: "", label: "" })}
            renderItem={(item, _, updateItem) => (
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Value" value={item.value} onChange={(e) => updateItem({ ...item, value: e.target.value })} />
                <Input placeholder="Label" value={item.label} onChange={(e) => updateItem({ ...item, label: e.target.value })} />
              </div>
            )}
          />
        </div>
      </Section>

      <Section title="Practice Areas" defaultOpen={false}>
        <div className="space-y-4">
          <div>
            <Label>Intro Section Label</Label>
            <Input
              value={content?.practiceAreasIntro?.sectionLabel ?? ""}
              onChange={(e) => update("practiceAreasIntro", { ...content.practiceAreasIntro, sectionLabel: e.target.value })}
            />
          </div>
          <div>
            <Label>Intro Heading</Label>
            <Input
              value={content?.practiceAreasIntro?.heading ?? ""}
              onChange={(e) => update("practiceAreasIntro", { ...content.practiceAreasIntro, heading: e.target.value })}
            />
          </div>
          <div>
            <Label>Intro Description</Label>
            <Textarea
              value={content?.practiceAreasIntro?.description ?? ""}
              onChange={(e) => update("practiceAreasIntro", { ...content.practiceAreasIntro, description: e.target.value })}
            />
          </div>
          <ArrayEditor
            items={content?.practiceAreas ?? []}
            onChange={(items) => update("practiceAreas", items)}
            itemLabel="Area"
            newItem={() => ({ title: "", image: "", link: "" })}
            renderItem={(item, _, updateItem) => (
              <div className="grid gap-3">
                <Input placeholder="Title" value={item.title} onChange={(e) => updateItem({ ...item, title: e.target.value })} />
                <ImageUploader value={item.image} onChange={(url) => updateItem({ ...item, image: url })} />
                <Input placeholder="Link" value={item.link} onChange={(e) => updateItem({ ...item, link: e.target.value })} />
              </div>
            )}
          />
        </div>
      </Section>

      <Section title="Awards Section" defaultOpen={false}>
        <div className="grid gap-4">
          <Input placeholder="Section Label" value={content?.awards?.sectionLabel ?? ""} onChange={(e) => update("awards", { ...content.awards, sectionLabel: e.target.value })} />
          <Input placeholder="Heading" value={content?.awards?.heading ?? ""} onChange={(e) => update("awards", { ...content.awards, heading: e.target.value })} />
          <Textarea placeholder="Description" value={content?.awards?.description ?? ""} onChange={(e) => update("awards", { ...content.awards, description: e.target.value })} />
          <ArrayEditor
            items={content?.awards?.logos ?? []}
            onChange={(logos) => update("awards", { ...content.awards, logos })}
            itemLabel="Logo"
            newItem={() => ({ src: "", alt: "" })}
            renderItem={(item, _, updateItem) => (
              <div className="grid gap-3">
                <ImageUploader value={item.src} onChange={(url) => updateItem({ ...item, src: url })} />
                <Input placeholder="Alt text" value={item.alt} onChange={(e) => updateItem({ ...item, alt: e.target.value })} />
              </div>
            )}
          />
        </div>
      </Section>

      <Section title="Testimonials" defaultOpen={false}>
        <div className="grid gap-4">
          <Input placeholder="Section Label" value={content?.testimonials?.sectionLabel ?? ""} onChange={(e) => update("testimonials", { ...content.testimonials, sectionLabel: e.target.value })} />
          <Input
            placeholder="Heading"
            value={content?.testimonials?.heading ?? ""}
            onChange={(e) => update("testimonials", { ...content.testimonials, heading: e.target.value })}
          />
          <Label>Background Image</Label>
          <ImageUploader
            value={content?.testimonials?.backgroundImage ?? ""}
            onChange={(url) => update("testimonials", { ...content.testimonials, backgroundImage: url })}
          />
          <ArrayEditor
            items={content?.testimonials?.items ?? []}
            onChange={(items) => update("testimonials", { ...content.testimonials, items })}
            itemLabel="Testimonial"
            newItem={() => ({ text: "", author: "", ratingImage: "" })}
            renderItem={(item, _, updateItem) => (
              <div className="grid gap-3">
                <Textarea placeholder="Text" value={item.text} onChange={(e) => updateItem({ ...item, text: e.target.value })} />
                <Input placeholder="Author" value={item.author} onChange={(e) => updateItem({ ...item, author: e.target.value })} />
                <ImageUploader value={item.ratingImage} onChange={(url) => updateItem({ ...item, ratingImage: url })} />
              </div>
            )}
          />
        </div>
      </Section>

      <Section title="Process Section" defaultOpen={false}>
        <div className="grid gap-4">
          <Input placeholder="Section Label" value={content?.process?.sectionLabel ?? ""} onChange={(e) => update("process", { ...content.process, sectionLabel: e.target.value })} />
          <Input placeholder="Heading Line 1" value={content?.process?.headingLine1 ?? ""} onChange={(e) => update("process", { ...content.process, headingLine1: e.target.value })} />
          <Input placeholder="Heading Line 2" value={content?.process?.headingLine2 ?? ""} onChange={(e) => update("process", { ...content.process, headingLine2: e.target.value })} />
          <ArrayEditor
            items={content?.process?.steps ?? []}
            onChange={(steps) => update("process", { ...content.process, steps })}
            itemLabel="Step"
            newItem={() => ({ number: "", title: "", description: "" })}
            renderItem={(item, _, updateItem) => (
              <div className="grid gap-3">
                <Input placeholder="Number" value={item.number} onChange={(e) => updateItem({ ...item, number: e.target.value })} />
                <Input placeholder="Title" value={item.title} onChange={(e) => updateItem({ ...item, title: e.target.value })} />
                <Textarea placeholder="Description" value={item.description} onChange={(e) => updateItem({ ...item, description: e.target.value })} />
              </div>
            )}
          />
        </div>
      </Section>

      <Section title="Google Reviews" defaultOpen={false}>
        <div className="grid gap-4">
          <Input placeholder="Section Label" value={content?.googleReviews?.sectionLabel ?? ""} onChange={(e) => update("googleReviews", { ...content.googleReviews, sectionLabel: e.target.value })} />
          <Input placeholder="Heading" value={content?.googleReviews?.heading ?? ""} onChange={(e) => update("googleReviews", { ...content.googleReviews, heading: e.target.value })} />
          <Textarea placeholder="Description" value={content?.googleReviews?.description ?? ""} onChange={(e) => update("googleReviews", { ...content.googleReviews, description: e.target.value })} />
          <ArrayEditor
            items={content?.googleReviews?.reviews ?? []}
            onChange={(reviews) => update("googleReviews", { ...content.googleReviews, reviews })}
            itemLabel="Review"
            newItem={() => ({ text: "", author: "", ratingImage: "" })}
            renderItem={(item, _, updateItem) => (
              <div className="grid gap-3">
                <Textarea placeholder="Text" value={item.text} onChange={(e) => updateItem({ ...item, text: e.target.value })} />
                <Input placeholder="Author" value={item.author} onChange={(e) => updateItem({ ...item, author: e.target.value })} />
                <ImageUploader value={item.ratingImage} onChange={(url) => updateItem({ ...item, ratingImage: url })} />
              </div>
            )}
          />
        </div>
      </Section>

      <Section title="FAQ" defaultOpen={false}>
        <div className="grid gap-4">
          <Input
            placeholder="Heading"
            value={content?.faq?.heading ?? ""}
            onChange={(e) => update("faq", { ...content.faq, heading: e.target.value })}
          />
          <Textarea placeholder="Description" value={content?.faq?.description ?? ""} onChange={(e) => update("faq", { ...content.faq, description: e.target.value })} />
          <Label>Video Thumbnail</Label>
          <ImageUploader
            value={content?.faq?.videoThumbnail ?? ""}
            onChange={(url) => update("faq", { ...content.faq, videoThumbnail: url })}
          />
          <Input placeholder="Video URL" value={content?.faq?.videoUrl ?? ""} onChange={(e) => update("faq", { ...content.faq, videoUrl: e.target.value })} />
          <ArrayEditor
            items={content?.faq?.items ?? []}
            onChange={(items) => update("faq", { ...content.faq, items })}
            itemLabel="FAQ Item"
            newItem={() => ({ question: "", answer: "" })}
            renderItem={(item, _, updateItem) => (
              <div className="grid gap-3">
                <Input placeholder="Question" value={item.question} onChange={(e) => updateItem({ ...item, question: e.target.value })} />
                <RichTextEditor content={item.answer} onChange={(val) => updateItem({ ...item, answer: val })} />
              </div>
            )}
          />
        </div>
      </Section>

      <Section title="Contact Section" defaultOpen={false}>
        <div className="grid gap-4">
          <Input placeholder="Section Label" value={content?.contact?.sectionLabel ?? ""} onChange={(e) => update("contact", { ...content.contact, sectionLabel: e.target.value })} />
          <Input placeholder="Heading" value={content?.contact?.heading ?? ""} onChange={(e) => update("contact", { ...content.contact, heading: e.target.value })} />
          <Textarea placeholder="Description" value={content?.contact?.description ?? ""} onChange={(e) => update("contact", { ...content.contact, description: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Phone</Label>
              <Input value={content?.contact?.phone ?? ""} onChange={(e) => update("contact", { ...content.contact, phone: e.target.value })} />
            </div>
            <div>
              <Label>Phone Label</Label>
              <Input value={content?.contact?.phoneLabel ?? ""} onChange={(e) => update("contact", { ...content.contact, phoneLabel: e.target.value })} />
            </div>
          </div>
          <Input placeholder="Address" value={content?.contact?.address ?? ""} onChange={(e) => update("contact", { ...content.contact, address: e.target.value })} />
          <Input placeholder="Form Heading" value={content?.contact?.formHeading ?? ""} onChange={(e) => update("contact", { ...content.contact, formHeading: e.target.value })} />
        </div>
      </Section>
    </div>
  );
}

// About Page Editor
function AboutPageEditor({
  content,
  onChange,
}: {
  content: AboutPageContent;
  onChange: (c: AboutPageContent) => void;
}) {
  const update = <K extends keyof AboutPageContent>(
    key: K,
    value: AboutPageContent[K],
  ) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-6">
      <Section title="Hero Section">
        <div className="grid gap-4">
          <Input
            placeholder="Section Label"
            value={content?.hero?.sectionLabel ?? ""}
            onChange={(e) => update("hero", { ...content.hero, sectionLabel: e.target.value })}
          />
          <Input
            placeholder="Tagline"
            value={content?.hero?.tagline ?? ""}
            onChange={(e) => update("hero", { ...content.hero, tagline: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            value={content?.hero?.description ?? ""}
            onChange={(e) => update("hero", { ...content.hero, description: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Phone" value={content?.hero?.phone ?? ""} onChange={(e) => update("hero", { ...content.hero, phone: e.target.value })} />
            <Input placeholder="Phone Label" value={content?.hero?.phoneLabel ?? ""} onChange={(e) => update("hero", { ...content.hero, phoneLabel: e.target.value })} />
          </div>
        </div>
      </Section>

      <Section title="Our Story" defaultOpen={false}>
        <div className="grid gap-4">
          <Input placeholder="Section Label" value={content?.story?.sectionLabel ?? ""} onChange={(e) => update("story", { ...content.story, sectionLabel: e.target.value })} />
          <Input
            placeholder="Heading"
            value={content?.story?.heading ?? ""}
            onChange={(e) => update("story", { ...content.story, heading: e.target.value })}
          />
          <Label>Image</Label>
          <ImageUploader
            value={content?.story?.image ?? ""}
            onChange={(url) => update("story", { ...content.story, image: url })}
          />
          <Input placeholder="Image Alt" value={content?.story?.imageAlt ?? ""} onChange={(e) => update("story", { ...content.story, imageAlt: e.target.value })} />
          <Label>Paragraphs</Label>
          <ArrayEditor
            items={(content?.story?.paragraphs ?? []).map(p => ({ text: p }))}
            onChange={(items) => update("story", { ...content.story, paragraphs: items.map(i => i.text) })}
            newItem={() => ({ text: "" })}
            renderItem={(item, _, updateItem) => (
              <Textarea value={item.text} onChange={(e) => updateItem({ text: e.target.value })} />
            )}
          />
        </div>
      </Section>

      <Section title="Mission & Vision" defaultOpen={false}>
        <div className="grid gap-6">
          <div className="space-y-4">
            <Label className="text-lg font-bold">Mission</Label>
            <Input placeholder="Heading" value={content?.missionVision?.mission?.heading ?? ""} onChange={(e) => update("missionVision", { ...content.missionVision, mission: { ...content.missionVision.mission, heading: e.target.value } })} />
            <Textarea placeholder="Text" value={content?.missionVision?.mission?.text ?? ""} onChange={(e) => update("missionVision", { ...content.missionVision, mission: { ...content.missionVision.mission, text: e.target.value } })} />
          </div>
          <div className="space-y-4">
            <Label className="text-lg font-bold">Vision</Label>
            <Input placeholder="Heading" value={content?.missionVision?.vision?.heading ?? ""} onChange={(e) => update("missionVision", { ...content.missionVision, vision: { ...content.missionVision.vision, heading: e.target.value } })} />
            <Textarea placeholder="Text" value={content?.missionVision?.vision?.text ?? ""} onChange={(e) => update("missionVision", { ...content.missionVision, vision: { ...content.missionVision.vision, text: e.target.value } })} />
          </div>
        </div>
      </Section>

      <Section title="Team" defaultOpen={false}>
        <div className="space-y-4">
          <Input placeholder="Section Label" value={content?.team?.sectionLabel ?? ""} onChange={(e) => update("team", { ...content.team, sectionLabel: e.target.value })} />
          <Input placeholder="Heading" value={content?.team?.heading ?? ""} onChange={(e) => update("team", { ...content.team, heading: e.target.value })} />
          <ArrayEditor
            items={content?.team?.members ?? []}
            onChange={(items) => update("team", { ...content.team, members: items })}
            itemLabel="Member"
            newItem={() => ({ name: "", title: "", bio: "", image: "", specialties: [] })}
            renderItem={(item, _, updateItem) => (
              <div className="grid gap-3">
                <Input placeholder="Name" value={item.name} onChange={(e) => updateItem({ ...item, name: e.target.value })} />
                <Input placeholder="Title" value={item.title} onChange={(e) => updateItem({ ...item, title: e.target.value })} />
                <ImageUploader value={item.image} onChange={(url) => updateItem({ ...item, image: url })} />
                <RichTextEditor content={item.bio} onChange={(val) => updateItem({ ...item, bio: val })} />
                <Label>Specialties (one per line)</Label>
                <Textarea value={(item.specialties || []).join("\n")} onChange={(e) => updateItem({ ...item, specialties: e.target.value.split("\n").filter(Boolean) })} />
              </div>
            )}
          />
        </div>
      </Section>

      <Section title="Values" defaultOpen={false}>
        <div className="space-y-4">
          <Input placeholder="Section Label" value={content?.values?.sectionLabel ?? ""} onChange={(e) => update("values", { ...content.values, sectionLabel: e.target.value })} />
          <Input placeholder="Heading" value={content?.values?.heading ?? ""} onChange={(e) => update("values", { ...content.values, heading: e.target.value })} />
          <Input placeholder="Subtitle" value={content?.values?.subtitle ?? ""} onChange={(e) => update("values", { ...content.values, subtitle: e.target.value })} />
          <ArrayEditor
            items={content?.values?.items ?? []}
            onChange={(items) => update("values", { ...content.values, items })}
            itemLabel="Value"
            newItem={() => ({ icon: "Shield", title: "", description: "" })}
            renderItem={(item, _, updateItem) => (
              <div className="grid gap-3">
                <Input placeholder="Icon" value={item.icon} onChange={(e) => updateItem({ ...item, icon: e.target.value })} />
                <Input placeholder="Title" value={item.title} onChange={(e) => updateItem({ ...item, title: e.target.value })} />
                <Textarea placeholder="Description" value={item.description} onChange={(e) => updateItem({ ...item, description: e.target.value })} />
              </div>
            )}
          />
        </div>
      </Section>

      <Section title="Stats" defaultOpen={false}>
        <ArrayEditor
          items={content?.stats?.stats ?? []}
          onChange={(stats) => update("stats", { stats })}
          itemLabel="Stat"
          newItem={() => ({ value: "", label: "" })}
          renderItem={(item, _, updateItem) => (
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Value" value={item.value} onChange={(e) => updateItem({ ...item, value: e.target.value })} />
              <Input placeholder="Label" value={item.label} onChange={(e) => updateItem({ ...item, label: e.target.value })} />
            </div>
          )}
        />
      </Section>

      <Section title="Why Choose Us" defaultOpen={false}>
        <div className="space-y-4">
          <Input placeholder="Section Label" value={content?.whyChooseUs?.sectionLabel ?? ""} onChange={(e) => update("whyChooseUs", { ...content.whyChooseUs, sectionLabel: e.target.value })} />
          <Input placeholder="Heading" value={content?.whyChooseUs?.heading ?? ""} onChange={(e) => update("whyChooseUs", { ...content.whyChooseUs, heading: e.target.value })} />
          <Textarea placeholder="Description" value={content?.whyChooseUs?.description ?? ""} onChange={(e) => update("whyChooseUs", { ...content.whyChooseUs, description: e.target.value })} />
          <ArrayEditor
            items={content?.whyChooseUs?.items ?? []}
            onChange={(items) => update("whyChooseUs", { ...content.whyChooseUs, items })}
            itemLabel="Item"
            newItem={() => ({ number: "", title: "", description: "" })}
            renderItem={(item, _, updateItem) => (
              <div className="grid gap-3">
                <Input placeholder="Number" value={item.number} onChange={(e) => updateItem({ ...item, number: e.target.value })} />
                <Input placeholder="Title" value={item.title} onChange={(e) => updateItem({ ...item, title: e.target.value })} />
                <Textarea placeholder="Description" value={item.description} onChange={(e) => updateItem({ ...item, description: e.target.value })} />
              </div>
            )}
          />
        </div>
      </Section>

      <Section title="CTA Section" defaultOpen={false}>
        <div className="grid gap-4">
          <Input placeholder="Heading" value={content?.cta?.heading ?? ""} onChange={(e) => update("cta", { ...content.cta, heading: e.target.value })} />
          <Textarea placeholder="Description" value={content?.cta?.description ?? ""} onChange={(e) => update("cta", { ...content.cta, description: e.target.value })} />
          <div className="space-y-2">
            <Label>Primary Button</Label>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Label" value={content?.cta?.primaryButton?.label ?? ""} onChange={(e) => update("cta", { ...content.cta, primaryButton: { ...content.cta.primaryButton, label: e.target.value } })} />
              <Input placeholder="Phone" value={content?.cta?.primaryButton?.phone ?? ""} onChange={(e) => update("cta", { ...content.cta, primaryButton: { ...content.cta.primaryButton, phone: e.target.value } })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Secondary Button</Label>
            <div className="grid grid-cols-3 gap-4">
              <Input placeholder="Label" value={content?.cta?.secondaryButton?.label ?? ""} onChange={(e) => update("cta", { ...content.cta, secondaryButton: { ...content.cta.secondaryButton, label: e.target.value } })} />
              <Input placeholder="Sublabel" value={content?.cta?.secondaryButton?.sublabel ?? ""} onChange={(e) => update("cta", { ...content.cta, secondaryButton: { ...content.cta.secondaryButton, sublabel: e.target.value } })} />
              <Input placeholder="Link" value={content?.cta?.secondaryButton?.link ?? ""} onChange={(e) => update("cta", { ...content.cta, secondaryButton: { ...content.cta.secondaryButton, link: e.target.value } })} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

// Contact Page Editor
function ContactPageEditor({
  content,
  onChange,
}: {
  content: ContactPageContent;
  onChange: (c: ContactPageContent) => void;
}) {
  const update = <K extends keyof ContactPageContent>(
    key: K,
    value: ContactPageContent[K],
  ) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-6">
      <Section title="Hero Section">
        <div className="grid gap-4">
          <Input
            placeholder="Section Label"
            value={content?.hero?.sectionLabel ?? ""}
            onChange={(e) => update("hero", { ...content.hero, sectionLabel: e.target.value })}
          />
          <Input
            placeholder="Tagline"
            value={content?.hero?.tagline ?? ""}
            onChange={(e) => update("hero", { ...content.hero, tagline: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            value={content?.hero?.description ?? ""}
            onChange={(e) => update("hero", { ...content.hero, description: e.target.value })}
          />
        </div>
      </Section>

      <Section title="Contact Methods" defaultOpen={false}>
        <ArrayEditor
          items={content?.contactMethods?.methods ?? []}
          onChange={(methods) => update("contactMethods", { methods })}
          itemLabel="Method"
          newItem={() => ({ icon: "Phone", title: "", detail: "", subDetail: "" })}
          renderItem={(item, _, updateItem) => (
            <div className="grid gap-3">
              <Input placeholder="Icon" value={item.icon} onChange={(e) => updateItem({ ...item, icon: e.target.value })} />
              <Input placeholder="Title" value={item.title} onChange={(e) => updateItem({ ...item, title: e.target.value })} />
              <Input placeholder="Detail" value={item.detail} onChange={(e) => updateItem({ ...item, detail: e.target.value })} />
              <Input placeholder="Sub Detail" value={item.subDetail} onChange={(e) => updateItem({ ...item, subDetail: e.target.value })} />
            </div>
          )}
        />
      </Section>

      <Section title="Form Section" defaultOpen={false}>
        <div className="grid gap-4">
          <Input placeholder="Heading" value={content?.form?.heading ?? ""} onChange={(e) => update("form", { ...content.form, heading: e.target.value })} />
          <Textarea placeholder="Subtext" value={content?.form?.subtext ?? ""} onChange={(e) => update("form", { ...content.form, subtext: e.target.value })} />
        </div>
      </Section>

      <Section title="Office Hours" defaultOpen={false}>
        <div className="grid gap-4">
          <Input placeholder="Heading" value={content?.officeHours?.heading ?? ""} onChange={(e) => update("officeHours", { ...content.officeHours, heading: e.target.value })} />
          <ArrayEditor
            items={content?.officeHours?.items ?? []}
            onChange={(items) => update("officeHours", { ...content.officeHours, items })}
            itemLabel="Hours Entry"
            newItem={() => ({ day: "", hours: "" })}
            renderItem={(item, _, updateItem) => (
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Day" value={item.day} onChange={(e) => updateItem({ ...item, day: e.target.value })} />
                <Input placeholder="Hours" value={item.hours} onChange={(e) => updateItem({ ...item, hours: e.target.value })} />
              </div>
            )}
          />
          <Input placeholder="Note" value={content?.officeHours?.note ?? ""} onChange={(e) => update("officeHours", { ...content.officeHours, note: e.target.value })} />
        </div>
      </Section>

      <Section title="Process Section" defaultOpen={false}>
        <div className="grid gap-4">
          <Input placeholder="Section Label" value={content?.process?.sectionLabel ?? ""} onChange={(e) => update("process", { ...content.process, sectionLabel: e.target.value })} />
          <Input placeholder="Heading" value={content?.process?.heading ?? ""} onChange={(e) => update("process", { ...content.process, heading: e.target.value })} />
          <Input placeholder="Subtitle" value={content?.process?.subtitle ?? ""} onChange={(e) => update("process", { ...content.process, subtitle: e.target.value })} />
          <ArrayEditor
            items={content?.process?.steps ?? []}
            onChange={(steps) => update("process", { ...content.process, steps })}
            itemLabel="Step"
            newItem={() => ({ number: "", title: "", description: "" })}
            renderItem={(item, _, updateItem) => (
              <div className="grid gap-3">
                <Input placeholder="Number" value={item.number} onChange={(e) => updateItem({ ...item, number: e.target.value })} />
                <Input placeholder="Title" value={item.title} onChange={(e) => updateItem({ ...item, title: e.target.value })} />
                <Textarea placeholder="Description" value={item.description} onChange={(e) => updateItem({ ...item, description: e.target.value })} />
              </div>
            )}
          />
        </div>
      </Section>

      <Section title="Visit Office" defaultOpen={false}>
        <div className="grid gap-4">
          <Input placeholder="Heading" value={content?.visitOffice?.heading ?? ""} onChange={(e) => update("visitOffice", { ...content.visitOffice, heading: e.target.value })} />
          <Textarea placeholder="Subtext" value={content?.visitOffice?.subtext ?? ""} onChange={(e) => update("visitOffice", { ...content.visitOffice, subtext: e.target.value })} />
          <Input placeholder="Google Maps Embed URL" value={content?.visitOffice?.mapEmbedUrl ?? ""} onChange={(e) => update("visitOffice", { ...content.visitOffice, mapEmbedUrl: e.target.value })} />
        </div>
      </Section>

      <Section title="CTA Section" defaultOpen={false}>
        <div className="grid gap-4">
          <Input placeholder="Heading" value={content?.cta?.heading ?? ""} onChange={(e) => update("cta", { ...content.cta, heading: e.target.value })} />
          <Textarea placeholder="Description" value={content?.cta?.description ?? ""} onChange={(e) => update("cta", { ...content.cta, description: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Button Label" value={content?.cta?.primaryButton?.label ?? ""} onChange={(e) => update("cta", { ...content.cta, primaryButton: { ...content.cta.primaryButton, label: e.target.value } })} />
            <Input placeholder="Phone" value={content?.cta?.primaryButton?.phone ?? ""} onChange={(e) => update("cta", { ...content.cta, primaryButton: { ...content.cta.primaryButton, phone: e.target.value } })} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input placeholder="Sec. Label" value={content?.cta?.secondaryButton?.label ?? ""} onChange={(e) => update("cta", { ...content.cta, secondaryButton: { ...content.cta.secondaryButton, label: e.target.value } })} />
            <Input placeholder="Sec. Sublabel" value={content?.cta?.secondaryButton?.sublabel ?? ""} onChange={(e) => update("cta", { ...content.cta, secondaryButton: { ...content.cta.secondaryButton, sublabel: e.target.value } })} />
            <Input placeholder="Sec. Link" value={content?.cta?.secondaryButton?.link ?? ""} onChange={(e) => update("cta", { ...content.cta, secondaryButton: { ...content.cta.secondaryButton, link: e.target.value } })} />
          </div>
        </div>
      </Section>
    </div>
  );
}

// Practice Areas Page Editor
function PracticeAreasPageEditor({
  content,
  onChange,
}: {
  content: PracticeAreasPageContent;
  onChange: (c: PracticeAreasPageContent) => void;
}) {
  const update = <K extends keyof PracticeAreasPageContent>(
    key: K,
    value: PracticeAreasPageContent[K],
  ) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-6">
      <Section title="Hero Section">
        <div className="grid gap-4">
          <Input
            placeholder="Section Label"
            value={content?.hero?.sectionLabel ?? ""}
            onChange={(e) => update("hero", { ...content.hero, sectionLabel: e.target.value })}
          />
          <Input
            placeholder="Tagline"
            value={content?.hero?.tagline ?? ""}
            onChange={(e) => update("hero", { ...content.hero, tagline: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            value={content?.hero?.description ?? ""}
            onChange={(e) => update("hero", { ...content.hero, description: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Phone" value={content?.hero?.phone ?? ""} onChange={(e) => update("hero", { ...content.hero, phone: e.target.value })} />
            <Input placeholder="Phone Label" value={content?.hero?.phoneLabel ?? ""} onChange={(e) => update("hero", { ...content.hero, phoneLabel: e.target.value })} />
          </div>
        </div>
      </Section>
      <Section title="Grid" defaultOpen={false}>
        <div className="space-y-4">
          <Input placeholder="Heading" value={content?.grid?.heading ?? ""} onChange={(e) => update("grid", { ...content.grid, heading: e.target.value })} />
          <Textarea placeholder="Description" value={content?.grid?.description ?? ""} onChange={(e) => update("grid", { ...content.grid, description: e.target.value })} />
          <ArrayEditor
            items={content?.grid?.areas ?? []}
            onChange={(areas) => update("grid", { ...content.grid, areas })}
            itemLabel="Area"
            newItem={() => ({ icon: "Shield", title: "", description: "", image: "", link: "" })}
            renderItem={(item, _, updateItem) => (
              <div className="grid gap-3">
                <Input placeholder="Icon" value={item.icon} onChange={(e) => updateItem({ ...item, icon: e.target.value })} />
                <Input placeholder="Title" value={item.title} onChange={(e) => updateItem({ ...item, title: e.target.value })} />
                <RichTextEditor content={item.description} onChange={(val) => updateItem({ ...item, description: val })} />
                <ImageUploader value={item.image} onChange={(url) => updateItem({ ...item, image: url })} />
                <Input placeholder="Link" value={item.link} onChange={(e) => updateItem({ ...item, link: e.target.value })} />
              </div>
            )}
          />
        </div>
      </Section>

      <Section title="Why Choose Us" defaultOpen={false}>
        <div className="space-y-4">
          <Input placeholder="Section Label" value={content?.whyChooseUs?.sectionLabel ?? ""} onChange={(e) => update("whyChooseUs", { ...content.whyChooseUs, sectionLabel: e.target.value })} />
          <Input placeholder="Heading" value={content?.whyChooseUs?.heading ?? ""} onChange={(e) => update("whyChooseUs", { ...content.whyChooseUs, heading: e.target.value })} />
          <Input placeholder="Subtitle" value={content?.whyChooseUs?.subtitle ?? ""} onChange={(e) => update("whyChooseUs", { ...content.whyChooseUs, subtitle: e.target.value })} />
          <Textarea placeholder="Description" value={content?.whyChooseUs?.description ?? ""} onChange={(e) => update("whyChooseUs", { ...content.whyChooseUs, description: e.target.value })} />
          <ArrayEditor
            items={content?.whyChooseUs?.items ?? []}
            onChange={(items) => update("whyChooseUs", { ...content.whyChooseUs, items })}
            itemLabel="Item"
            newItem={() => ({ number: "", title: "", description: "" })}
            renderItem={(item, _, updateItem) => (
              <div className="grid gap-3">
                <Input placeholder="Number" value={item.number} onChange={(e) => updateItem({ ...item, number: e.target.value })} />
                <Input placeholder="Title" value={item.title} onChange={(e) => updateItem({ ...item, title: e.target.value })} />
                <Textarea placeholder="Description" value={item.description} onChange={(e) => updateItem({ ...item, description: e.target.value })} />
              </div>
            )}
          />
        </div>
      </Section>

      <Section title="CTA Section" defaultOpen={false}>
        <div className="grid gap-4">
          <Input placeholder="Heading" value={content?.cta?.heading ?? ""} onChange={(e) => update("cta", { ...content.cta, heading: e.target.value })} />
          <Textarea placeholder="Description" value={content?.cta?.description ?? ""} onChange={(e) => update("cta", { ...content.cta, description: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Button Label" value={content?.cta?.primaryButton?.label ?? ""} onChange={(e) => update("cta", { ...content.cta, primaryButton: { ...content.cta.primaryButton, label: e.target.value } })} />
            <Input placeholder="Phone" value={content?.cta?.primaryButton?.phone ?? ""} onChange={(e) => update("cta", { ...content.cta, primaryButton: { ...content.cta.primaryButton, phone: e.target.value } })} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input placeholder="Sec. Label" value={content?.cta?.secondaryButton?.label ?? ""} onChange={(e) => update("cta", { ...content.cta, secondaryButton: { ...content.cta.secondaryButton, label: e.target.value } })} />
            <Input placeholder="Sec. Sublabel" value={content?.cta?.secondaryButton?.sublabel ?? ""} onChange={(e) => update("cta", { ...content.cta, secondaryButton: { ...content.cta.secondaryButton, sublabel: e.target.value } })} />
            <Input placeholder="Sec. Link" value={content?.cta?.secondaryButton?.link ?? ""} onChange={(e) => update("cta", { ...content.cta, secondaryButton: { ...content.cta.secondaryButton, link: e.target.value } })} />
          </div>
        </div>
      </Section>
    </div>
  );
}

// Main PageContentEditor component
export default function PageContentEditor({
  pageKey,
  content,
  onChange,
}: PageContentEditorProps) {
  const urlPath = typeof pageKey === "string" ? pageKey : "";

  if (urlPath === "/" || urlPath === "/home") {
    return (
      <HomePageEditor
        content={content as HomePageContent}
        onChange={onChange}
      />
    );
  }

  if (urlPath === "/about") {
    return (
      <AboutPageEditor
        content={content as AboutPageContent}
        onChange={onChange}
      />
    );
  }

  if (urlPath === "/contact") {
    return (
      <ContactPageEditor
        content={content as ContactPageContent}
        onChange={onChange}
      />
    );
  }

  if (urlPath === "/practice-areas") {
    return (
      <PracticeAreasPageEditor
        content={content as PracticeAreasPageContent}
        onChange={onChange}
      />
    );
  }

  return (
    <Section title="Page Content (JSON)">
      <Textarea
        value={JSON.stringify(content, null, 2)}
        onChange={(e) => {
          try {
            onChange(JSON.parse(e.target.value));
          } catch {
            // Invalid JSON, ignore
          }
        }}
        rows={20}
        className="font-mono text-sm"
      />
    </Section>
  );
}
