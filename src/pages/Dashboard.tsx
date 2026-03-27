import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Plus, Loader2, ExternalLink, Trash2, CreditCard, BarChart3, MessageCircle, ShoppingBag, Workflow } from "lucide-react";

interface IntegrationRequest {
  id: string;
  company_name: string;
  website_url: string | null;
  use_case: string | null;
  created_at: string;
}

const availableIntegrations = [
  { icon: CreditCard, name: "Stripe", description: "Payment processing & billing", connected: true },
  { icon: BarChart3, name: "Google Analytics", description: "Website & app analytics", connected: false },
  { icon: MessageCircle, name: "Slack", description: "Team communication", connected: true },
  { icon: ShoppingBag, name: "Shopify", description: "E-commerce platform", connected: false },
  { icon: Workflow, name: "Zapier", description: "Workflow automation", connected: false },
];

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<IntegrationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ companyName: "", websiteUrl: "", useCase: "" });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user]);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("integration_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.companyName.trim()) {
      toast.error("Please enter a company name");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to submit a request");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("integration_requests").insert({
        user_id: user.id,
        company_name: form.companyName.trim(),
        website_url: form.websiteUrl.trim() || null,
        use_case: form.useCase.trim() || null,
      });

      if (error) throw error;

      toast.success("Integration request submitted successfully!");
      setForm({ companyName: "", websiteUrl: "", useCase: "" });
      setShowForm(false);
      fetchRequests();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to submit request";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("integration_requests")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Request deleted");
      setRequests(requests.filter((r) => r.id !== id));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to delete request";
      toast.error(message);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display font-bold text-3xl text-foreground mb-2">
              Welcome back{user.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""}
            </h1>
            <p className="text-muted-foreground">
              Manage your integrations and request new ones
            </p>
          </div>

          {/* Available Integrations */}
          <section className="mb-12">
            <h2 className="font-display font-semibold text-xl text-foreground mb-4">Available Integrations</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {availableIntegrations.map((integration) => (
                <Card key={integration.name} className="relative overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <integration.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{integration.name}</h3>
                          {integration.connected && (
                            <span className="text-xs bg-green/10 text-green px-2 py-0.5 rounded-full">Connected</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{integration.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Request Integration Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-xl text-foreground">Integration Requests</h2>
              <Button onClick={() => setShowForm(!showForm)} variant={showForm ? "outline" : "hero"} size="sm">
                {showForm ? "Cancel" : (
                  <>
                    <Plus className="h-4 w-4 mr-1" /> Request Integration
                  </>
                )}
              </Button>
            </div>

            {/* Request Form */}
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Request a New Integration</CardTitle>
                    <CardDescription>
                      {"Don't see the integration you need? Let us know and we'll work on adding it."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Company / Tool Name *</Label>
                          <Input
                            id="companyName"
                            placeholder="e.g., Notion, HubSpot"
                            value={form.companyName}
                            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                            disabled={submitting}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="websiteUrl">Website URL</Label>
                          <Input
                            id="websiteUrl"
                            type="url"
                            placeholder="https://example.com"
                            value={form.websiteUrl}
                            onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                            disabled={submitting}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="useCase">How would you use this integration?</Label>
                        <Textarea
                          id="useCase"
                          placeholder="Describe your use case..."
                          value={form.useCase}
                          onChange={(e) => setForm({ ...form, useCase: e.target.value })}
                          disabled={submitting}
                          rows={3}
                        />
                      </div>
                      <Button type="submit" variant="hero" disabled={submitting}>
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Request"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Requests List */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : requests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    {"You haven't submitted any integration requests yet."}
                  </p>
                  {!showForm && (
                    <Button onClick={() => setShowForm(true)} variant="link" className="mt-2">
                      Request your first integration
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {requests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-foreground">{request.company_name}</h3>
                            {request.website_url && (
                              <a
                                href={request.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}
                          </div>
                          {request.use_case && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {request.use_case}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            Requested on {new Date(request.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive shrink-0"
                          onClick={() => handleDelete(request.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
