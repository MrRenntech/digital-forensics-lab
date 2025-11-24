import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, BookOpen, Trophy, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import universityLogo from '@/assets/university-logo.png';

const features = [
  {
    icon: Shield,
    title: 'Secure Lab Environment',
    description: 'Practice digital forensics in a safe, controlled environment without affecting live systems.'
  },
  {
    icon: BookOpen,
    title: 'Hands-on Learning',
    description: 'Interactive modules covering hash analysis, email forensics, log analysis, and disk imaging.'
  },
  {
    icon: Users,
    title: 'Student & Instructor Tools',
    description: 'Comprehensive platform for both learners and educators with progress tracking and grading.'
  },
  {
    icon: Trophy,
    title: 'Real-world Scenarios',
    description: 'Simulate actual cyber investigations including data breaches, phishing, and malware analysis.'
  }
];

const labModules = [
  'Hash Analysis & Integrity Verification',
  'Email Header Analysis & Phishing Detection',
  'System Log Investigation',
  'Disk Imaging & File Recovery',
  'Registry Key Extraction',
  'Timeline Analysis',
  'Metadata Examination',
  'Incident Response Workflows'
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center space-y-8">
          <div className="flex justify-center mb-6">
            <img 
              src={universityLogo} 
              alt="K.R. Mangalam University" 
              className="h-24 w-24"
            />
          </div>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Digital Forensics e-Lab
            </h1>
            <p className="text-xl text-muted-foreground">
              K.R. Mangalam University
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Master digital forensics through hands-on training in a secure, interactive laboratory environment. 
              Investigate cybercrimes, analyze evidence, and develop critical forensic skills.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link to="/login">
                Access Lab Environment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg">
              Learn More
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            🔒 Secure • 🎓 Educational • 🛡️ Professional-Grade Tools
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Advanced Forensics Training Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience real-world digital forensics through simulated investigations, 
              professional-grade tools, and comprehensive learning modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lab Modules Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Comprehensive Lab Modules
              </h2>
              <p className="text-lg text-muted-foreground">
                Master digital forensics through structured learning paths covering 
                essential investigative techniques and modern cybersecurity challenges.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {labModules.map((module, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm">{module}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Simulated Investigations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 bg-card rounded-lg border">
                      <h4 className="font-semibold text-sm">Data Breach Investigation</h4>
                      <p className="text-xs text-muted-foreground">
                        Analyze compromised systems and trace attack vectors
                      </p>
                    </div>
                    <div className="p-4 bg-card rounded-lg border">
                      <h4 className="font-semibold text-sm">Phishing Analysis</h4>
                      <p className="text-xs text-muted-foreground">
                        Examine suspicious emails and identify threats
                      </p>
                    </div>
                    <div className="p-4 bg-card rounded-lg border">
                      <h4 className="font-semibold text-sm">Malware Forensics</h4>
                      <p className="text-xs text-muted-foreground">
                        Investigate malicious software and its impact
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto text-center space-y-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Master Digital Forensics?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join K.R. Mangalam University's advanced digital forensics program and 
              gain hands-on experience with industry-standard investigative techniques.
            </p>
          </div>

          <Button asChild size="lg" className="text-lg">
            <Link to="/login">
              Enter Lab Environment
              <Shield className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <p className="text-sm text-muted-foreground">
            Secure access for enrolled students and faculty members
          </p>
        </div>
      </section>
    </div>
  );
}