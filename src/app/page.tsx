
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { answerQuestionsAboutUniversity } from '@/ai/flows/answer-questions-about-university';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { 
  MessageSquare, 
  History, 
  Settings, 
  Sun, 
  Moon, 
  MoreVertical, 
  User, 
  Send,
  Loader2,
  Copy
} from 'lucide-react';

// Interfaces for typings
interface Message {
  id: number;
  text: string;
  isUser: boolean;
  isLoading?: boolean;
}

const parseMessageText = (text: string) => {
  if (!text) return { __html: '' };
  // Convert **text** to <strong>text</strong> and *text* or _text_ to <em>text</em>
  const html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/_([^_]+)_/g, '<em>$1</em>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />'); // Also handle newlines
  return { __html: html };
};

const SkipToContentLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-ring"
  >
    Saltar al contenido principal
  </a>
);

const MessageBubble = ({ message }: { message: Message }) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text);
    toast({
      title: "Copiado",
      description: "Mensaje copiado al portapapeles.",
    });
  };

  return (
    <div className={`group/message flex items-start gap-3 my-4 ${message.isUser ? 'justify-end' : ''}`}>
      {!message.isUser && (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-primary flex-shrink-0 flex items-center justify-center text-primary-foreground font-bold text-lg" aria-hidden="true">
          E
        </div>
      )}
      <div className={`relative max-w-xl p-3 rounded-2xl shadow-md ${message.isUser ? 'bg-primary-container text-on-primary-container rounded-br-md' : 'bg-muted text-foreground rounded-bl-md'}`}>
        {message.isLoading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Escribiendo..</span>
          </div>
        ) : (
          <>
            <div
              className="prose dark:prose-invert prose-sm max-w-none prose-p:before:content-none prose-p:after:content-none"
              dangerouslySetInnerHTML={parseMessageText(message.text)}
            />
            {!message.isUser && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 h-7 w-7 opacity-0 group-hover/message:opacity-100 transition-opacity"
                onClick={copyToClipboard}
                aria-label="Copiar mensaje"
              >
                <Copy className="h-4 w-4" />
              </Button>
            )}
          </>
        )}
      </div>
       {message.isUser && (
        <div className="w-9 h-9 rounded-full bg-muted text-muted-foreground flex-shrink-0 flex items-center justify-center" aria-hidden="true">
          <User className="h-5 w-5"/>
        </div>
      )}
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now(),
      text: '¡Hola! Soy EVA, tu asistente virtual para la Universidad Nacional de Colombia. ¿Cómo puedo ayudarte hoy?',
      isUser: false
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('dark');
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Set initial theme based on system preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        setTheme(storedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = { id: Date.now(), text: currentMessage, isUser: true };
    const loadingMessage: Message = { id: Date.now() + 1, text: '', isUser: false, isLoading: true };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    
    setCurrentMessage('');
    setLoading(true);

    try {
      const response = await answerQuestionsAboutUniversity({ question: userMessage.text });
      const aiMessage: Message = { id: Date.now(), text: response.answer, isUser: false };
      
      setMessages(prev => prev.filter(m => !m.isLoading).concat(aiMessage));

    } catch (error) {
      console.error(error);
      const errorMessage: Message = { id: Date.now(), text: "Lo siento, hubo un error al procesar tu solicitud.", isUser: false };
      setMessages(prev => prev.filter(m => !m.isLoading).concat(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);

  return (
    <>
      <Toaster />
      <SkipToContentLink />
      <div className="grid grid-cols-[72px_1fr] grid-rows-[auto_1fr_auto] h-screen max-h-screen overflow-hidden bg-background">
        
        {/* Navigation Rail */}
        <nav className="row-span-3 bg-card border-r flex flex-col items-center p-2 gap-4">
          <div className="luna-logo w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-primary-foreground text-2xl font-bold">
            E
          </div>
          <Button variant="secondary" size="icon" aria-label="Chat" className="w-14 h-14 rounded-2xl">
            <MessageSquare />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Historial" className="w-14 h-14 rounded-2xl">
            <History />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Ajustes" className="w-14 h-14 rounded-2xl">
            <Settings />
          </Button>
          <div className="mt-auto">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Cambiar tema" className="w-14 h-14 rounded-2xl">
              {theme === 'dark' ? <Sun /> : <Moon />}
            </Button>
          </div>
        </nav>

        {/* Header */}
        <header className="bg-background border-b p-4 flex justify-between items-center min-h-[64px]">
          <h1 className="text-xl font-semibold">EVA Asistente</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <MoreVertical />
            </Button>
            <Button variant="ghost" size="icon">
              <User />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main id="main-content" className="bg-background overflow-hidden flex flex-col">
          <ScrollArea className="flex-grow" ref={chatContainerRef}>
            <div className="px-8 pt-6">
              {messages.map(message => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>
          </ScrollArea>
        </main>
        
        {/* Input Area */}
        <div className="bg-card border-t p-4">
            <div className="max-w-4xl mx-auto flex items-end gap-3">
               <Input
                placeholder="Escribe tu mensaje a EVA..."
                className="flex-1 rounded-full px-5 py-3 h-14 text-base resize-none bg-muted focus-visible:ring-primary"
                value={currentMessage}
                onChange={e => setCurrentMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && !loading && (e.preventDefault(), handleSendMessage())}
                disabled={loading}
                aria-label="Entrada de mensaje"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={loading || !currentMessage.trim()} 
                aria-label="Enviar mensaje"
                className="w-12 h-12 rounded-full flex-shrink-0"
                size="icon"
              >
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-6 w-6"/>}
              </Button>
            </div>
        </div>

      </div>
    </>
  );
}
