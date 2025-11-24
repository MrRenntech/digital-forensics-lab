import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Hash, 
  Mail, 
  FileText, 
  HardDrive, 
  Clock, 
  Users, 
  CheckCircle2,
  PlayCircle,
  Book
} from 'lucide-react';

interface LabModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  icon: React.ElementType;
  status: 'not-started' | 'in-progress' | 'completed';
  progress?: number;
}

const labModules: LabModule[] = [
  {
    id: 'hash-analysis',
    title: 'Hash Analysis Lab',
    description: 'Learn to verify file integrity using MD5, SHA-1, and SHA-256 hashing algorithms.',
    difficulty: 'Beginner',
    duration: '45 min',
    icon: Hash,
    status: 'not-started',
    progress: 0
  },
  {
    id: 'email-forensics',
    title: 'Email Forensics Investigation',
    description: 'Analyze email headers, trace origins, and identify phishing attempts.',
    difficulty: 'Intermediate',
    duration: '60 min',
    icon: Mail,
    status: 'not-started',
    progress: 0
  },
  {
    id: 'log-analysis',
    title: 'System Log Analysis',
    description: 'Examine Windows event logs and Linux system logs for security incidents.',
    difficulty: 'Intermediate',
    duration: '75 min',
    icon: FileText,
    status: 'not-started',
    progress: 0
  },
  {
    id: 'disk-imaging',
    title: 'Disk Imaging & Recovery',
    description: 'Create forensic disk images and recover deleted files using specialized tools.',
    difficulty: 'Advanced',
    duration: '90 min',
    icon: HardDrive,
    status: 'not-started',
    progress: 0
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-green-500';
    case 'Intermediate': return 'bg-yellow-500';
    case 'Advanced': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case 'in-progress': return <PlayCircle className="h-4 w-4 text-blue-500" />;
    default: return <Book className="h-4 w-4 text-gray-500" />;
  }
};

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const completedLabs = labModules.filter(lab => lab.status === 'completed').length;
  const inProgressLabs = labModules.filter(lab => lab.status === 'in-progress').length;
  const totalProgress = (completedLabs / labModules.length) * 100;

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            {user.role === 'instructor' 
              ? 'Manage your forensics lab assignments and track student progress.'
              : 'Continue your digital forensics training journey.'}
          </p>
        </div>

        {/* Progress Overview */}
        {user.role === 'student' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{Math.round(totalProgress)}%</div>
                  <Progress value={totalProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {completedLabs} of {labModules.length} labs completed
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Active Labs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{inProgressLabs}</div>
                  <p className="text-xs text-muted-foreground">
                    Labs currently in progress
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Time Invested</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">12h 30m</div>
                  <p className="text-xs text-muted-foreground">
                    Total lab time this month
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Lab Modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            {user.role === 'instructor' ? 'Lab Modules Management' : 'Available Lab Modules'}
          </h2>
          {user.role === 'instructor' && (
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              View All Students
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {labModules.map((lab) => {
            const IconComponent = lab.icon;
            return (
              <Card key={lab.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{lab.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getDifficultyColor(lab.difficulty)}`}
                          >
                            {lab.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {lab.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                    {getStatusIcon(lab.status)}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription>{lab.description}</CardDescription>
                  
                  {lab.status === 'in-progress' && lab.progress && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{lab.progress}%</span>
                      </div>
                      <Progress value={lab.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      variant={lab.status === 'completed' ? 'outline' : 'default'}
                      asChild
                    >
                      <Link to={`/lab/${lab.id}`}>
                        {lab.status === 'completed' ? 'Review Lab' : 
                         lab.status === 'in-progress' ? 'Continue Lab' : 'Start Lab'}
                      </Link>
                    </Button>
                    {user.role === 'instructor' && (
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Instructor Dashboard Extensions */}
      {user.role === 'instructor' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Instructor Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Student Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  View detailed progress reports and performance analytics.
                </p>
                <Button variant="outline" className="w-full">View Analytics</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Lab Assignment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Assign labs to students and set deadlines.
                </p>
                <Button variant="outline" className="w-full">Manage Assignments</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Grade Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Review and grade student lab submissions.
                </p>
                <Button variant="outline" className="w-full">Grade Submissions</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}