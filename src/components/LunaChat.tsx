
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { answerQuestionsAboutUniversity } from '@/ai/flows/answer-questions-about-university';
import { Moon, Sun, Loader2, Copy, HelpCircle, Mail } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea as ScrollAreaPrimitive } from "@radix-ui/react-scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import Image from 'next/image';
// import lunaLogo from './luna-logo.png'; // Assuming you have a logo image


const LunaChat = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    {
      text: '¡Hola! Soy LUNA, tu asistente virtual de la Facultad de Minas para la UN. ¿En qué puedo ayudarte hoy?',
      isLuna: true,
      id: Date.now() + Math.random(),
      isLoading: false,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // Default theme set to dark
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSend = async () => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    const userMessage = { text: trimmedQuestion, isLuna: false, id: Date.now(), isLoading: false };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setChatHistory(prevHistory => [...prevHistory, `User: ${trimmedQuestion}`]);
    setQuestion('');
    setLoading(true);

    // Add a temporary loading message for LUNA
    const loadingLunaMessageId = Date.now() + Math.random();
    setMessages(prevMessages => [...prevMessages, {
      text: '', // Placeholder for actual response
      isLuna: true,
      id: loadingLunaMessageId,
      isLoading: true, // Set loading state for this specific message
    }]);

    try {
      const lunaResponse = await answerQuestionsAboutUniversity({ question: trimmedQuestion });
      const responseText = lunaResponse?.answer ?? 'No he podido encontrar una respuesta a tu pregunta.';
      // Update the loading message with the actual response
      setMessages(prevMessages => prevMessages.map(msg =>
        msg.id === loadingLunaMessageId ? { ...msg, text: responseText, isLoading: false } : msg
      ));
      setChatHistory(prevHistory => [...prevHistory, `Luna: ${responseText}`]);
    } catch (error) {
      console.error('Error fetching LUNA response:', error);
      const errorMessage = '¡Ups! Algo salió mal al intentar procesar tu pregunta. Por favor, inténtalo de nuevo más tarde.';
      // Update the loading message with the error
      setMessages(prevMessages => prevMessages.map(msg =>
        msg.id === loadingLunaMessageId ? { ...msg, text: errorMessage, isLoading: false } : msg
      ));
      setChatHistory(prevHistory => [...prevHistory, `Luna: Error - ${errorMessage}`]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyChatHistory = () => {
    const combinedChatHistory = chatHistory.join('\n');
    navigator.clipboard.writeText(combinedChatHistory)
      .then(() => {
        toast({
          title: "¡Historial copiado!",
          description: "El historial del chat ha sido copiado al portapapeles.",
        });
      })
      .catch(err => {
        toast({
          variant: "destructive",
          title: "Error al copiar",
          description: `No se pudo copiar el historial: ${err.message}`,
        });
      });
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start pt-6 sm:pt-10 pb-6 ${theme === 'dark' ? 'dark' : ''}`}>
      <header className="w-full flex justify-between items-center px-4 sm:px-6 mb-6 sm:mb-8 py-3">
        {/* The LUNA logo image and its container div have been removed */}
        <div></div> {/* This empty div helps maintain the justify-between layout if no logo/title is present */}
        
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent/50">
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">Soporte</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-background border-border shadow-xl rounded-xl">
              <div className="grid gap-4 p-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none text-foreground">Soporte LUNA Chat</h4>
                  <a href="mailto:soporte-luna@unal.edu.co" className="text-sm text-muted-foreground hover:text-primary flex items-center transition-colors">
                    <Mail className="mr-2 h-4 w-4" /> soporte-luna@unal.edu.co
                  </a>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button onClick={toggleTheme} variant="ghost" size="icon" className="text-foreground hover:bg-accent/50">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Cambiar Tema</span>
          </Button>
           <Button variant="outline" className="hidden sm:inline-flex">
            Iniciar Sesión
          </Button>
        </div>
      </header>

      <main className="w-full max-w-2xl px-4 flex flex-col flex-grow">
        <ScrollArea ref={chatContainerRef} className="chat-container flex-grow rounded-2xl mb-4">
          {messages.map((message) => (
            <div key={message.id}
              className={`message flex gap-3 mb-4 max-w-[85%] p-3 rounded-xl shadow-md break-words ${
                message.isLuna
                  ? 'luna-message self-start bg-card text-card-foreground border border-border rounded-tl-none' // Applied new style
                  : 'user-message self-end bg-primary text-primary-foreground rounded-tr-none'
              }`}>
               {message.isLuna && (
                <Avatar className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                  <Image src="https://placehold.co/40x40/B794F4/FFFFFF.png?text=L" alt="Luna Avatar" width={40} height={40} data-ai-hint="abstract modern" className="rounded-full" />
                </Avatar>
              )}
              <div className="flex flex-col">
                {message.isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-5 w-5 animate-spin text-accent" />
                  </div>
                ) : (
                  <p className="text-sm sm:text-base">{message.text}</p>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>

        <div className="input-container sticky bottom-4 bg-background/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-border">
          <Input
            type="text"
            className="input-field flex-grow bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground text-foreground"
            placeholder="Escribe tu pregunta aquí..."
            value={question}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && !loading && handleSend()}
            disabled={loading}
          />
          <Button className="send-button rounded-xl" onClick={handleSend} disabled={loading}>
            {loading && !messages.some(m => m.isLoading && m.isLuna) ? <Loader2 className="h-5 w-5 animate-spin" /> : "Enviar"}
          </Button>
        </div>
        <p className="disclaimer">
          Esto es una prueba beta para Luna. Puede cometer alucinaciones.
        </p>

        <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border text-foreground">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Historial del Chat</h2>
               <Button variant="secondary" size="sm" onClick={handleCopyChatHistory} className="bg-accent/70 hover:bg-accent text-accent-foreground">
                  <Copy className="h-4 w-4 mr-2" />
                   Copiar
                </Button>
            </div>
            <ScrollAreaPrimitive className="max-h-40 overflow-y-auto text-sm">
              <ul className="list-none p-0 space-y-1">
                {chatHistory.map((entry, index) => (
                  <li key={index} className="py-1 px-2 rounded-md hover:bg-accent/10">
                    <span className={entry.startsWith('User:') ? 'font-medium text-primary' : 'text-secondary'}>
                      {entry.startsWith('User:') ? 'Tú: ' : 'Luna: '}
                    </span>
                    {entry.substring(entry.indexOf(':') + 2)}
                  </li>
                ))}
                {chatHistory.length === 0 && <p className="text-muted-foreground italic">El historial está vacío.</p>}
              </ul>
            </ScrollAreaPrimitive>
          </div>
      </main>
    </div>
  );
};

export default LunaChat;
