import { useState } from 'react';
import type { ContentBlock } from '@site/lib/blocks';
import RichTextEditor from './RichTextEditor';
import ImageUploader from './ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  GripVertical,
  Type,
  Image,
  List,
  Phone,
  Layout,
  Users,
  Grid,
  MessageSquare,
  MapPin,
  Columns,
  FileText,
  Star,
  BarChart2,
  Search,
  HelpCircle,
  Info,
  Layers,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface BlockEditorProps {
  content: ContentBlock[];
  onChange: (content: ContentBlock[]) => void;
}

const BLOCK_TYPES = [
  { type: 'hero', label: 'Hero Section', icon: Layout },
  { type: 'heading', label: 'Heading', icon: Type },
  { type: 'paragraph', label: 'Paragraph', icon: FileText },
  { type: 'bullets', label: 'Bullet List', icon: List },
  { type: 'cta', label: 'Call to Action', icon: Phone },
  { type: 'image', label: 'Image', icon: Image },
  { type: 'attorney-bio', label: 'Attorney Bio', icon: Users },
  { type: 'services-grid', label: 'Services Grid', icon: Grid },
  { type: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { type: 'contact-form', label: 'Contact Form', icon: MessageSquare },
  { type: 'map', label: 'Map', icon: MapPin },
  { type: 'two-column', label: 'Two Columns', icon: Columns },
  { type: 'practice-areas-grid', label: 'Practice Areas Grid', icon: Grid },
  { type: 'google-reviews', label: 'Google Reviews', icon: Star },
  { type: 'stats', label: 'Stats', icon: BarChart2 },
  { type: 'reviews-slider', label: 'Reviews Slider', icon: MessageSquare },
  { type: 'tabs-section', label: 'Tabs Section', icon: Layers },
  { type: 'seo-text', label: 'SEO Text', icon: Search },
  { type: 'faq', label: 'FAQ', icon: HelpCircle },
  { type: 'logo-grid', label: 'Logo Grid', icon: Grid },
  { type: 'info-section', label: 'Info Section', icon: Info },
  { type: 'logo-strip', label: 'Logo Strip (5 logos)', icon: Grid },
] as const;

function getDefaultBlock(type: string): ContentBlock {
  switch (type) {
    case 'hero':
      return { type: 'hero', title: 'Page Title', subtitle: 'Page subtitle', showCTA: false };
    case 'heading':
      return { type: 'heading', level: 2, text: 'Section Heading' };
    case 'paragraph':
      return { type: 'paragraph', content: '<p>Enter your content here...</p>' };
    case 'bullets':
      return { type: 'bullets', items: ['Item 1', 'Item 2', 'Item 3'] };
    case 'cta':
      return { type: 'cta', text: 'Call Us Today', variant: 'primary' };
    case 'image':
      return { type: 'image', src: '/placeholder.svg', alt: 'Image description' };
    case 'attorney-bio':
      return { type: 'attorney-bio', name: 'Attorney Name', title: 'Title', image: '/placeholder.svg', bio: 'Attorney bio...' };
    case 'services-grid':
      return { type: 'services-grid', services: [{ icon: 'Car', title: 'Service Title', description: 'Service description' }] };
    case 'testimonials':
      return { type: 'testimonials', testimonials: [{ initials: 'JD', text: 'Great service!', rating: 5 }] };
    case 'contact-form':
      return { type: 'contact-form', heading: 'Contact Us' };
    case 'map':
      return { type: 'map', address: '4120 Presidential Parkway, Suite 200, Atlanta, GA 30340' };
    case 'two-column':
      return { type: 'two-column', left: [], right: [] };
    case 'practice-areas-grid':
      return { type: 'practice-areas-grid', areas: [{ icon: 'Car', title: 'Practice Area', description: 'Description' }] };
    case 'google-reviews':
      return { type: 'google-reviews', heading: 'What Our Clients Say', reviews: [{ author: 'John Doe', rating: 5, text: 'Excellent service!' }] };
    case 'stats':
      return { type: 'stats', stats: [{ value: '100+', label: 'Cases Won' }] };
    case 'reviews-slider':
      return { type: 'reviews-slider', heading: 'Our Reviews' };
    case 'tabs-section':
      return { type: 'tabs-section', heading: 'More Information', tabs: [{ label: 'Tab 1', contentHeading: 'Tab Heading', paragraphs: 'Tab content...' }] };
    case 'seo-text':
      return { type: 'seo-text', heading: 'SEO Heading', paragraphs: 'SEO content...' };
    case 'faq':
      return { type: 'faq', heading: 'Frequently Asked Questions', items: [{ question: 'Question?', answer: 'Answer.' }] };
    case 'logo-grid':
      return { type: 'logo-grid', heading: 'Our Partners', logos: [{ src: '/placeholder.svg', alt: 'Partner Logo' }] };
    case 'info-section':
      return { type: 'info-section', heading: 'Info Heading', text: 'Info text...' };
    case 'logo-strip':
      return {
        type: 'logo-strip',
        heading: 'Naši partneri',
        text: '',
        logos: [
          { src: '', alt: '' },
          { src: '', alt: '' },
          { src: '', alt: '' },
          { src: '', alt: '' },
          { src: '', alt: '' },
        ],
      };
    default:
      return { type: 'paragraph', content: '' };
  }
}

export default function BlockEditor({ content, onChange }: BlockEditorProps) {
  const addBlock = (type: string) => {
    const newBlock = getDefaultBlock(type);
    onChange([...content, newBlock]);
  };

  const updateBlock = (index: number, updates: Partial<ContentBlock>) => {
    const newContent = [...content];
    newContent[index] = { ...newContent[index], ...updates } as ContentBlock;
    onChange(newContent);
  };

  const removeBlock = (index: number) => {
    onChange(content.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= content.length) return;
    
    const newContent = [...content];
    [newContent[index], newContent[newIndex]] = [newContent[newIndex], newContent[index]];
    onChange(newContent);
  };

  return (
    <div className="space-y-4">
      {content.map((block, index) => (
        <BlockCard
          key={index}
          block={block}
          index={index}
          total={content.length}
          onUpdate={(updates) => updateBlock(index, updates)}
          onRemove={() => removeBlock(index)}
          onMove={(dir) => moveBlock(index, dir)}
        />
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full border-dashed">
            <Plus className="h-4 w-4 mr-2" />
            Add Block
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {BLOCK_TYPES.map(({ type, label, icon: Icon }) => (
            <DropdownMenuItem key={type} onClick={() => addBlock(type)}>
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface BlockCardProps {
  block: ContentBlock;
  index: number;
  total: number;
  onUpdate: (updates: Partial<ContentBlock>) => void;
  onRemove: () => void;
  onMove: (direction: 'up' | 'down') => void;
}

function BlockCard({ block, index, total, onUpdate, onRemove, onMove }: BlockCardProps) {
  const [expanded, setExpanded] = useState(true);
  const blockInfo = BLOCK_TYPES.find(b => b.type === block.type);
  const Icon = blockInfo?.icon || FileText;

  return (
    <Card>
      <CardHeader className="py-3 px-4">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
          <Icon className="h-4 w-4 text-gray-500" />
          <CardTitle 
            className="text-sm font-medium flex-1 cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            {blockInfo?.label || block.type}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMove('up')}
              disabled={index === 0}
              className="h-8 w-8 p-0"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMove('down')}
              disabled={index === total - 1}
              className="h-8 w-8 p-0"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="pt-0">
          <BlockFields block={block} onUpdate={onUpdate} />
        </CardContent>
      )}
    </Card>
  );
}

function BlockFields({ block, onUpdate }: { block: ContentBlock; onUpdate: (updates: Partial<ContentBlock>) => void }) {
  switch (block.type) {
    case 'hero':
      return (
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input value={block.title} onChange={(e) => onUpdate({ title: e.target.value })} />
          </div>
          <div>
            <Label>Subtitle</Label>
            <RichTextEditor
              content={block.subtitle || ''}
              onChange={(val) => onUpdate({ subtitle: val })}
              placeholder="Hero subtitle text..."
            />
          </div>
          <div>
            <Label>Background Image</Label>
            <ImageUploader value={block.backgroundImage || ''} onChange={(url) => onUpdate({ backgroundImage: url })} />
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={block.showCTA || false} onCheckedChange={(checked) => onUpdate({ showCTA: checked })} />
            <Label>Show Call-to-Action Button</Label>
          </div>
          {block.showCTA && (
            <div>
              <Label>CTA Button Text</Label>
              <Input value={block.ctaText || ''} onChange={(e) => onUpdate({ ctaText: e.target.value })} />
            </div>
          )}
        </div>
      );

    case 'heading':
      return (
        <div className="space-y-4">
          <div>
            <Label>Text</Label>
            <Input value={block.text} onChange={(e) => onUpdate({ text: e.target.value })} />
          </div>
          <div>
            <Label>Level</Label>
            <Select value={String(block.level)} onValueChange={(v) => onUpdate({ level: Number(v) as 1 | 2 | 3 })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">H1 - Main Title</SelectItem>
                <SelectItem value="2">H2 - Section Title</SelectItem>
                <SelectItem value="3">H3 - Subsection</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );

    case 'paragraph':
      return (
        <div className="space-y-2">
          <Label>Content</Label>
          <RichTextEditor
            content={block.content}
            onChange={(content) => onUpdate({ content })}
            placeholder="Enter paragraph content..."
          />
        </div>
      );

    case 'bullets':
      return (
        <div className="space-y-2">
          <Label>Items (one per line)</Label>
          <Textarea
            value={block.items.join('\n')}
            onChange={(e) => onUpdate({ items: e.target.value.split('\n').filter(Boolean) })}
            rows={4}
          />
        </div>
      );

    case 'cta':
      return (
        <div className="space-y-4">
          <div>
            <Label>Button Text</Label>
            <Input value={block.text} onChange={(e) => onUpdate({ text: e.target.value })} />
          </div>
          <div>
            <Label>Phone Type</Label>
            <Select value={block.phoneType || 'primary'} onValueChange={(v) => onUpdate({ phoneType: v as 'primary' | 'secondary' })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary Phone</SelectItem>
                <SelectItem value="secondary">Secondary Phone</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-400 mt-1">Phone numbers are managed in Site Settings</p>
          </div>
          <div>
            <Label>Style</Label>
            <Select value={block.variant || 'primary'} onValueChange={(v) => onUpdate({ variant: v as 'primary' | 'outline' })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary (Filled)</SelectItem>
                <SelectItem value="outline">Outline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );

    case 'image':
      return (
        <div className="space-y-4">
          <div>
            <Label>Image</Label>
            <ImageUploader value={block.src} onChange={(url) => onUpdate({ src: url })} />
          </div>
          <div>
            <Label>Alt Text</Label>
            <Input value={block.alt} onChange={(e) => onUpdate({ alt: e.target.value })} />
          </div>
        </div>
      );

    case 'attorney-bio':
      return (
        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input value={block.name} onChange={(e) => onUpdate({ name: e.target.value })} />
          </div>
          <div>
            <Label>Title</Label>
            <Input value={block.title} onChange={(e) => onUpdate({ title: e.target.value })} />
          </div>
          <div>
            <Label>Image</Label>
            <ImageUploader value={block.image} onChange={(url) => onUpdate({ image: url })} />
          </div>
          <div>
            <Label>Bio</Label>
            <RichTextEditor
              content={block.bio}
              onChange={(bio) => onUpdate({ bio })}
              placeholder="Attorney biography..."
            />
          </div>
        </div>
      );

    case 'contact-form':
      return (
        <div className="space-y-4">
          <div>
            <Label>Heading</Label>
            <Input value={block.heading ?? ""} onChange={(e) => onUpdate({ heading: e.target.value })} />
          </div>
          <div>
            <Label>Description</Label>
            <Input value={block.description ?? ""} onChange={(e) => onUpdate({ description: e.target.value })} />
          </div>
          <div>
            <Label>Form Image</Label>
            <ImageUploader value={block.image || ''} onChange={(url) => onUpdate({ image: url })} />
          </div>
        </div>
      );

    case 'map':
      return (
        <div>
          <Label>Address</Label>
          <Input value={block.address} onChange={(e) => onUpdate({ address: e.target.value })} />
        </div>
      );

    case 'services-grid':
    case 'practice-areas-grid': {
      const items = block.type === 'services-grid' ? block.services : block.areas;
      const itemKey = block.type === 'services-grid' ? 'services' : 'areas';
      return (
        <div className="space-y-4">
          {block.type === 'services-grid' && (
            <>
              <div>
                <Label>Heading</Label>
                <Input value={block.heading || ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
              </div>
              <div>
                <Label>Subtext</Label>
                <Input value={(block as any).subtext || ''} onChange={(e) => onUpdate({ subtext: e.target.value } as any)} />
              </div>
            </>
          )}
          {items.map((item, idx) => (
            <div key={idx} className="p-4 border rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <Label>Item {idx + 1}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUpdate({ [itemKey]: items.filter((_, i) => i !== idx) })}
                  className="text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                placeholder="Icon (e.g., Car, Truck)"
                value={item.icon}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[idx] = { ...newItems[idx], icon: e.target.value };
                  onUpdate({ [itemKey]: newItems });
                }}
              />
              <Input
                placeholder="Title"
                value={item.title}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[idx] = { ...newItems[idx], title: e.target.value };
                  onUpdate({ [itemKey]: newItems });
                }}
              />
              {block.type === 'services-grid' && (
                <Input
                  placeholder="Link (e.g., /services/example)"
                  value={(item as any).link || ''}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[idx] = { ...newItems[idx], link: e.target.value };
                    onUpdate({ [itemKey]: newItems });
                  }}
                />
              )}
              <div className="space-y-1">
                <Label className="text-xs text-gray-400 uppercase tracking-wider">Description</Label>
                <RichTextEditor
                  placeholder="Description"
                  content={item.description}
                  onChange={(desc) => {
                    const newItems = [...items];
                    newItems[idx] = { ...newItems[idx], description: desc };
                    onUpdate({ [itemKey]: newItems });
                  }}
                />
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => onUpdate({ [itemKey]: [...items, { icon: 'FileText', title: 'New Item', description: '' }] })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      );
    }

    case 'google-reviews':
      return (
        <div className="space-y-4">
          <div>
            <Label>Heading</Label>
            <Input value={block.heading || ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
          </div>
          {block.reviews.map((review, idx) => (
            <div key={idx} className="p-4 border rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <Label>Review {idx + 1}</Label>
                <Button variant="ghost" size="sm" onClick={() => onUpdate({ reviews: block.reviews.filter((_, i) => i !== idx) })} className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Author" value={review.author} onChange={(e) => {
                const newReviews = [...block.reviews];
                newReviews[idx] = { ...newReviews[idx], author: e.target.value };
                onUpdate({ reviews: newReviews });
              }} />
              <Input type="number" min="1" max="5" placeholder="Rating" value={review.rating} onChange={(e) => {
                const newReviews = [...block.reviews];
                newReviews[idx] = { ...newReviews[idx], rating: Number(e.target.value) };
                onUpdate({ reviews: newReviews });
              }} />
              <Textarea placeholder="Review text" value={review.text} onChange={(e) => {
                const newReviews = [...block.reviews];
                newReviews[idx] = { ...newReviews[idx], text: e.target.value };
                onUpdate({ reviews: newReviews });
              }} />
            </div>
          ))}
          <Button variant="outline" onClick={() => onUpdate({ reviews: [...block.reviews, { author: '', rating: 5, text: '' }] })}>
            <Plus className="h-4 w-4 mr-2" /> Add Review
          </Button>
        </div>
      );

    case 'stats':
      return (
        <div className="space-y-4">
          {block.stats.map((stat, idx) => (
            <div key={idx} className="p-4 border rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <Label>Stat {idx + 1}</Label>
                <Button variant="ghost" size="sm" onClick={() => onUpdate({ stats: block.stats.filter((_, i) => i !== idx) })} className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Value (e.g. 100+)" value={stat.value} onChange={(e) => {
                const newStats = [...block.stats];
                newStats[idx] = { ...newStats[idx], value: e.target.value };
                onUpdate({ stats: newStats });
              }} />
              <Input placeholder="Label (e.g. Cases Won)" value={stat.label} onChange={(e) => {
                const newStats = [...block.stats];
                newStats[idx] = { ...newStats[idx], label: e.target.value };
                onUpdate({ stats: newStats });
              }} />
            </div>
          ))}
          <Button variant="outline" onClick={() => onUpdate({ stats: [...block.stats, { value: '', label: '' }] })}>
            <Plus className="h-4 w-4 mr-2" /> Add Stat
          </Button>
        </div>
      );

    case 'reviews-slider':
      return (
        <div>
          <Label>Heading</Label>
          <Input value={block.heading || ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
        </div>
      );

    case 'tabs-section':
      return (
        <div className="space-y-4">
          <div>
            <Label>Heading</Label>
            <Input value={block.heading || ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
          </div>
          {block.tabs.map((tab, idx) => (
            <div key={idx} className="p-4 border rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <Label>Tab {idx + 1}</Label>
                <Button variant="ghost" size="sm" onClick={() => onUpdate({ tabs: block.tabs.filter((_, i) => i !== idx) })} className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Tab Label" value={tab.label} onChange={(e) => {
                const newTabs = [...block.tabs];
                newTabs[idx] = { ...newTabs[idx], label: e.target.value };
                onUpdate({ tabs: newTabs });
              }} />
              <Input placeholder="Content Heading" value={tab.contentHeading} onChange={(e) => {
                const newTabs = [...block.tabs];
                newTabs[idx] = { ...newTabs[idx], contentHeading: e.target.value };
                onUpdate({ tabs: newTabs });
              }} />
              <RichTextEditor content={tab.paragraphs} onChange={(val) => {
                const newTabs = [...block.tabs];
                newTabs[idx] = { ...newTabs[idx], paragraphs: val };
                onUpdate({ tabs: newTabs });
              }} />
              <div>
                <Label className="text-xs text-gray-400 uppercase tracking-wider">Bullet Points (one per line)</Label>
                <Textarea
                  value={(tab.bullets || []).join('\n')}
                  onChange={(e) => {
                    const newTabs = [...block.tabs];
                    newTabs[idx] = { ...newTabs[idx], bullets: e.target.value.split('\n') };
                    onUpdate({ tabs: newTabs });
                  }}
                  rows={3}
                  placeholder="Enter each bullet point on a new line"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-gray-400 uppercase tracking-wider">CTA Text</Label>
                  <Input placeholder="Button text" value={tab.ctaText || ''} onChange={(e) => {
                    const newTabs = [...block.tabs];
                    newTabs[idx] = { ...newTabs[idx], ctaText: e.target.value };
                    onUpdate({ tabs: newTabs });
                  }} />
                </div>
                <div>
                  <Label className="text-xs text-gray-400 uppercase tracking-wider">CTA URL</Label>
                  <Input placeholder="/page-link" value={tab.ctaUrl || ''} onChange={(e) => {
                    const newTabs = [...block.tabs];
                    newTabs[idx] = { ...newTabs[idx], ctaUrl: e.target.value };
                    onUpdate({ tabs: newTabs });
                  }} />
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={() => onUpdate({ tabs: [...block.tabs, { label: '', contentHeading: '', paragraphs: '' }] })}>
            <Plus className="h-4 w-4 mr-2" /> Add Tab
          </Button>
        </div>
      );

    case 'seo-text':
      return (
        <div className="space-y-4">
          <div>
            <Label>Heading</Label>
            <Input value={block.heading || ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
          </div>
          <div>
            <Label>Content</Label>
            <RichTextEditor content={block.paragraphs} onChange={(val) => onUpdate({ paragraphs: val })} />
          </div>
          <div>
            <Label>Bullet Points (one per line)</Label>
            <Textarea
              value={(block.bullets || []).join('\n')}
              onChange={(e) => onUpdate({ bullets: e.target.value.split('\n') })}
              rows={4}
              placeholder="Enter each bullet point on a new line"
            />
          </div>
          <div>
            <Label>Image</Label>
            <ImageUploader value={block.imageUrl || ''} onChange={(url) => onUpdate({ imageUrl: url })} />
          </div>
          <div>
            <Label>Image Alt</Label>
            <Input value={block.imageAlt || ''} onChange={(e) => onUpdate({ imageAlt: e.target.value })} />
          </div>
          <div>
            <Label>Image Position</Label>
            <Select value={block.imagePosition || 'right'} onValueChange={(v) => onUpdate({ imagePosition: v as 'left' | 'right' })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );

    case 'faq':
      return (
        <div className="space-y-4">
          <div>
            <Label>Heading</Label>
            <Input value={block.heading || ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
          </div>
          {block.items.map((item, idx) => (
            <div key={idx} className="p-4 border rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <Label>FAQ Item {idx + 1}</Label>
                <Button variant="ghost" size="sm" onClick={() => onUpdate({ items: block.items.filter((_, i) => i !== idx) })} className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Question" value={item.question} onChange={(e) => {
                const newItems = [...block.items];
                newItems[idx] = { ...newItems[idx], question: e.target.value };
                onUpdate({ items: newItems });
              }} />
              <RichTextEditor content={item.answer} onChange={(val) => {
                const newItems = [...block.items];
                newItems[idx] = { ...newItems[idx], answer: val };
                onUpdate({ items: newItems });
              }} />
            </div>
          ))}
          <Button variant="outline" onClick={() => onUpdate({ items: [...block.items, { question: '', answer: '' }] })}>
            <Plus className="h-4 w-4 mr-2" /> Add FAQ
          </Button>
        </div>
      );

    case 'logo-grid':
      return (
        <div className="space-y-4">
          <div>
            <Label>Heading</Label>
            <Input value={block.heading || ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
          </div>
          {block.logos.map((logo, idx) => (
            <div key={idx} className="p-4 border rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <Label>Logo {idx + 1}</Label>
                <Button variant="ghost" size="sm" onClick={() => onUpdate({ logos: block.logos.filter((_, i) => i !== idx) })} className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <ImageUploader value={logo.src} onChange={(url) => {
                const newLogos = [...block.logos];
                newLogos[idx] = { ...newLogos[idx], src: url };
                onUpdate({ logos: newLogos });
              }} />
              <Input placeholder="Alt Text" value={logo.alt || ''} onChange={(e) => {
                const newLogos = [...block.logos];
                newLogos[idx] = { ...newLogos[idx], alt: e.target.value };
                onUpdate({ logos: newLogos });
              }} />
            </div>
          ))}
          <Button variant="outline" onClick={() => onUpdate({ logos: [...block.logos, { src: '', alt: '' }] })}>
            <Plus className="h-4 w-4 mr-2" /> Add Logo
          </Button>
        </div>
      );

    case 'info-section':
      return (
        <div className="space-y-4">
          <div>
            <Label>Heading</Label>
            <Input value={block.heading || ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
          </div>
          <div>
            <Label>Text</Label>
            <RichTextEditor content={block.text || ''} onChange={(val) => onUpdate({ text: val })} />
          </div>
          <div>
            <Label>Image</Label>
            <ImageUploader value={block.image || ''} onChange={(url) => onUpdate({ image: url })} />
          </div>
          <div>
            <Label>Image Position</Label>
            <Select value={block.imagePosition || 'right'} onValueChange={(v) => onUpdate({ imagePosition: v as 'left' | 'right' })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>CTA Text</Label>
              <Input value={block.ctaText || ''} onChange={(e) => onUpdate({ ctaText: e.target.value })} />
            </div>
            <div>
              <Label>CTA Variant</Label>
              <Select value={block.ctaVariant || 'primary'} onValueChange={(v) => onUpdate({ ctaVariant: v as 'primary' | 'outline' | 'solid' })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="solid">Solid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      );

    case 'two-column':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 border rounded-lg bg-gray-50/50">
          <div className="space-y-4">
            <Label className="text-lg font-bold">Left Column</Label>
            <BlockEditor
              content={block.left}
              onChange={(left) => onUpdate({ left })}
            />
          </div>
          <div className="space-y-4">
            <Label className="text-lg font-bold">Right Column</Label>
            <BlockEditor
              content={block.right}
              onChange={(right) => onUpdate({ right })}
            />
          </div>
        </div>
      );

    case 'testimonials':
      return (
        <div className="space-y-4">
          <div>
            <Label>Heading</Label>
            <Input value={block.heading || ''} onChange={(e) => onUpdate({ heading: e.target.value })} />
          </div>
          <div>
            <Label>Display Variant</Label>
            <Select value={block.variant || 'slider'} onValueChange={(v) => onUpdate({ variant: v as 'grid' | 'slider' })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="slider">Slider</SelectItem>
                <SelectItem value="grid">Grid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {block.testimonials.map((t, idx) => (
            <div key={idx} className="p-4 border rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <Label>Testimonial {idx + 1}</Label>
                <Button variant="ghost" size="sm" onClick={() => onUpdate({ testimonials: block.testimonials.filter((_, i) => i !== idx) })} className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Initials (e.g. AR)" value={t.initials} onChange={(e) => {
                const newT = [...block.testimonials];
                newT[idx] = { ...newT[idx], initials: e.target.value };
                onUpdate({ testimonials: newT });
              }} />
              <Input placeholder="Author name" value={t.author || ''} onChange={(e) => {
                const newT = [...block.testimonials];
                newT[idx] = { ...newT[idx], author: e.target.value };
                onUpdate({ testimonials: newT });
              }} />
              <Input type="number" min="1" max="5" placeholder="Rating" value={t.rating} onChange={(e) => {
                const newT = [...block.testimonials];
                newT[idx] = { ...newT[idx], rating: Number(e.target.value) };
                onUpdate({ testimonials: newT });
              }} />
              <RichTextEditor content={t.text} onChange={(val) => {
                const newT = [...block.testimonials];
                newT[idx] = { ...newT[idx], text: val };
                onUpdate({ testimonials: newT });
              }} />
            </div>
          ))}
          <Button variant="outline" onClick={() => onUpdate({ testimonials: [...block.testimonials, { initials: '', text: '', rating: 5 }] })}>
            <Plus className="h-4 w-4 mr-2" /> Add Testimonial
          </Button>
        </div>
      );

    case 'logo-strip': {
      const logoBlock = block as Extract<typeof block, { type: 'logo-strip' }>;
      const logos = (logoBlock as any).logos || [];
      return (
        <div className="space-y-4">
          <div>
            <Label>Heading</Label>
            <Input value={(logoBlock as any).heading || ''} onChange={(e) => onUpdate({ heading: e.target.value } as any)} />
          </div>
          <div>
            <Label>Text</Label>
            <Input value={(logoBlock as any).text || ''} onChange={(e) => onUpdate({ text: e.target.value } as any)} />
          </div>
          {logos.map((logo: { src: string; alt?: string }, idx: number) => (
            <div key={idx} className="p-4 border rounded-lg space-y-2">
              <Label>Logo {idx + 1}</Label>
              <ImageUploader
                value={logo.src}
                onChange={(url) => {
                  const newLogos = [...logos];
                  newLogos[idx] = { ...newLogos[idx], src: url };
                  onUpdate({ logos: newLogos } as any);
                }}
              />
              <Input
                placeholder="Alt Text"
                value={logo.alt || ''}
                onChange={(e) => {
                  const newLogos = [...logos];
                  newLogos[idx] = { ...newLogos[idx], alt: e.target.value };
                  onUpdate({ logos: newLogos } as any);
                }}
              />
            </div>
          ))}
        </div>
      );
    }

    default:
      return <p className="text-gray-500">No editor available for this block type</p>;
  }
}
