import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(2000),
});

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "zaky42203@gmail.com",
    href: "mailto:zaky42203@gmail.com",
  },
  {
    icon: Phone,
    label: "Telepon",
    value: "+62 822-8552-0586",
    href: "tel:+6282285520586",
  },
  {
    icon: MapPin,
    label: "Lokasi",
    value: "Banda Aceh, Indonesia",
    href: "https://maps.app.goo.gl/bREkF4hkaakUbn1m7",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: any) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((p) => ({ ...p, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as string;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      toast({
        title: "Pesan Terkirim ✨",
        description: "Saya akan membalas secepatnya.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast({
        title: "Gagal mengirim",
        description: "Coba lagi nanti ya.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="
        py-20 md:py-32 relative overflow-hidden

        bg-gradient-to-br
        from-[#f5f3ff] via-[#fdf4ff] to-[#eef2ff]

        dark:from-[#020617]
        dark:via-[#0b1020]
        dark:to-[#020617]
      "
    >
      {/* glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[400px] h-[400px] bg-violet-400/30 blur-[140px] rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-pink-400/30 blur-[140px] rounded-full bottom-[-120px] right-[-120px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* HEADER */}
        <motion.div className="text-center mb-16">
          <span className="text-violet-500 font-medium">Kontak</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            Hubungi Saya
          </h2>
          <div className="w-24 h-[3px] mx-auto mt-4 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* INFO */}
          <div className="space-y-6">
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.href}
                className="
                  flex items-center gap-4 p-4 rounded-xl
                  bg-white/40 dark:bg-white/5
                  backdrop-blur-md
                  border border-white/20
                  hover:scale-[1.02] transition
                "
              >
                <div className="p-3 rounded-lg bg-violet-500/10">
                  <info.icon className="text-violet-500" />
                </div>
                <div>
                  <p className="text-sm opacity-70">{info.label}</p>
                  <p className="font-medium">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="
              p-6 rounded-2xl
              bg-white/40 dark:bg-white/5
              backdrop-blur-md
              border border-white/20
              space-y-4
            "
          >
            <Input
              name="name"
              placeholder="Nama"
              onChange={handleChange}
              value={formData.name}
            />
            <Input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
            />
            <Input
              name="subject"
              placeholder="Subjek"
              onChange={handleChange}
              value={formData.subject}
            />
            <Textarea
              name="message"
              placeholder="Pesan"
              rows={5}
              onChange={handleChange}
              value={formData.message}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full rounded-full
                bg-gradient-to-r from-violet-500 to-pink-500
                hover:opacity-90
              "
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <Send className="mr-2" />
              )}
              Kirim
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}