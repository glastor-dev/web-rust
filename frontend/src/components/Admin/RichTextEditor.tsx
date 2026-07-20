'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
} from 'lucide-react';
import { useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      // we can save as HTML or JSON. Let's save as HTML string for easier integration if we don't have a complex renderer yet
      // A true headless CMS would use editor.getJSON()
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm prose-invert focus:outline-none min-h-[200px] w-full bg-zinc-900/50 rounded-md p-4 text-zinc-300 border border-white/10',
      },
    },
  });

  // Update content if value changes from outside (e.g. loading initial data)
  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleStrike = () => editor.chain().focus().toggleStrike().run();
  const toggleH1 = () => editor.chain().focus().toggleHeading({ level: 1 }).run();
  const toggleH2 = () => editor.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  const toggleBlockquote = () => editor.chain().focus().toggleBlockquote().run();

  const ToolbarButton = ({ onClick, isActive, children }: any) => (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`p-2 rounded-md transition-colors ${isActive ? 'bg-zinc-800 text-brand' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full border border-white/10 rounded-md overflow-hidden flex flex-col">
      <div className="flex flex-wrap items-center gap-1 bg-[#050505] p-2 border-b border-white/10">
        <ToolbarButton onClick={toggleBold} isActive={editor.isActive('bold')}>
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={toggleItalic} isActive={editor.isActive('italic')}>
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={toggleStrike} isActive={editor.isActive('strike')}>
          <Strikethrough size={16} />
        </ToolbarButton>
        <div className="w-px h-4 bg-white/10 mx-1" />
        <ToolbarButton onClick={toggleH1} isActive={editor.isActive('heading', { level: 1 })}>
          <Heading1 size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={toggleH2} isActive={editor.isActive('heading', { level: 2 })}>
          <Heading2 size={16} />
        </ToolbarButton>
        <div className="w-px h-4 bg-white/10 mx-1" />
        <ToolbarButton onClick={toggleBulletList} isActive={editor.isActive('bulletList')}>
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={toggleOrderedList} isActive={editor.isActive('orderedList')}>
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={toggleBlockquote} isActive={editor.isActive('blockquote')}>
          <Quote size={16} />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} className="bg-[#050505] cursor-text" />
    </div>
  );
}
