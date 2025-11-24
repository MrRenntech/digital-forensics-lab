import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Hash, 
  Upload, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Download,
  FileText,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileEvidence {
  id: string;
  name: string;
  size: string;
  type: string;
  md5: string;
  sha1: string;
  sha256: string;
  compromised: boolean;
  description: string;
}

const evidenceFiles: FileEvidence[] = [
  {
    id: '1',
    name: 'document.pdf',
    size: '2.4 MB',
    type: 'PDF Document',
    md5: 'd41d8cd98f00b204e9800998ecf8427e',
    sha1: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    compromised: false,
    description: 'Original contract document'
  },
  {
    id: '2',
    name: 'suspicious_file.exe',
    size: '856 KB',
    type: 'Executable',
    md5: '5d41402abc4b2a76b9719d911017c592',
    sha1: 'aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d',
    sha256: '7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730',
    compromised: true,
    description: 'Potentially malicious executable found in Downloads folder'
  },
  {
    id: '3',
    name: 'backup_data.zip',
    size: '15.2 MB',
    type: 'Archive',
    md5: 'c4ca4238a0b923820dcc509a6f75849b',
    sha1: '356a192b7913b04c54574d18c28d46e6395428ab',
    sha256: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
    compromised: false,
    description: 'System backup containing user files'
  }
];

const knownHashes = {
  // Known malicious hash database (simplified)
  '5d41402abc4b2a76b9719d911017c592': 'Trojan.Generic.Malware',
  'aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d': 'Trojan.Generic.Malware',
  '7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730': 'Trojan.Generic.Malware'
};

export default function HashAnalysisLab() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<FileEvidence | null>(null);
  const [userHash, setUserHash] = useState('');
  const [hashType, setHashType] = useState<'md5' | 'sha1' | 'sha256'>('md5');
  const [verificationResults, setVerificationResults] = useState<{[key: string]: boolean}>({});
  const [labProgress, setLabProgress] = useState(10);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleFileSelect = (file: FileEvidence) => {
    setSelectedFile(file);
    setCurrentStep(2);
    setLabProgress(25);
  };

  const handleHashVerification = () => {
    if (!selectedFile || !userHash) return;

    const correctHash = selectedFile[hashType];
    const isCorrect = userHash.toLowerCase() === correctHash.toLowerCase();
    
    setVerificationResults(prev => ({
      ...prev,
      [`${selectedFile.id}_${hashType}`]: isCorrect
    }));

    if (isCorrect) {
      toast({
        title: 'Hash Verification Successful',
        description: `${hashType.toUpperCase()} hash matches the original file.`,
      });
      setCurrentStep(3);
      setLabProgress(60);
    } else {
      toast({
        title: 'Hash Mismatch Detected',
        description: 'The provided hash does not match. File may be compromised.',
        variant: 'destructive',
      });
    }
  };

  const checkMaliciousHash = (hash: string) => {
    return knownHashes[hash as keyof typeof knownHashes];
  };

  const getFileStatus = (file: FileEvidence) => {
    const malwareSignature = checkMaliciousHash(file.md5) || 
                           checkMaliciousHash(file.sha1) || 
                           checkMaliciousHash(file.sha256);
    
    if (malwareSignature) {
      return { status: 'malicious', signature: malwareSignature };
    }
    return { status: file.compromised ? 'suspicious' : 'clean' };
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Lab Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Hash className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Hash Analysis Laboratory</h1>
              <p className="text-muted-foreground">
                Learn file integrity verification using cryptographic hashes
              </p>
            </div>
          </div>
          <Badge variant="secondary">
            Beginner Level
          </Badge>
        </div>

        {/* Progress Indicator */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Lab Progress</span>
                <span>{labProgress}%</span>
              </div>
              <Progress value={labProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Lab Interface */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={`step-${currentStep}`} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="step-1" disabled={currentStep < 1}>
                1. File Selection
              </TabsTrigger>
              <TabsTrigger value="step-2" disabled={currentStep < 2}>
                2. Hash Analysis
              </TabsTrigger>
              <TabsTrigger value="step-3" disabled={currentStep < 3}>
                3. Threat Assessment
              </TabsTrigger>
            </TabsList>

            {/* Step 1: File Selection */}
            <TabsContent value="step-1" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Evidence Files
                  </CardTitle>
                  <CardDescription>
                    Select a file from the evidence collection for hash analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {evidenceFiles.map((file) => {
                    const fileStatus = getFileStatus(file);
                    return (
                      <div
                        key={file.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                          selectedFile?.id === file.id ? 'border-primary bg-primary/5' : ''
                        }`}
                        onClick={() => handleFileSelect(file)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span className="font-medium">{file.name}</span>
                              <Badge 
                                variant={
                                  fileStatus.status === 'malicious' ? 'destructive' :
                                  fileStatus.status === 'suspicious' ? 'secondary' : 'outline'
                                }
                                className="text-xs"
                              >
                                {fileStatus.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {file.description}
                            </p>
                            <div className="text-xs text-muted-foreground">
                              {file.type} • {file.size}
                            </div>
                          </div>
                          {fileStatus.status === 'malicious' && (
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 2: Hash Analysis */}
            <TabsContent value="step-2" className="space-y-4">
              {selectedFile && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Hash className="h-5 w-5" />
                      Hash Verification: {selectedFile.name}
                    </CardTitle>
                    <CardDescription>
                      Verify file integrity by comparing hash values
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* File Hash Display */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Original File Hashes:</h4>
                      <div className="space-y-3">
                        {(['md5', 'sha1', 'sha256'] as const).map((type) => (
                          <div key={type} className="space-y-2">
                            <Label className="text-xs font-mono uppercase">
                              {type}
                            </Label>
                            <div className="p-2 bg-muted rounded font-mono text-xs break-all">
                              {selectedFile[type]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hash Verification Input */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Verify Hash Integrity:</h4>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>Hash Type</Label>
                          <select 
                            value={hashType} 
                            onChange={(e) => setHashType(e.target.value as any)}
                            className="w-full p-2 border rounded-md bg-background"
                          >
                            <option value="md5">MD5</option>
                            <option value="sha1">SHA-1</option>
                            <option value="sha256">SHA-256</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Enter Hash for Verification</Label>
                          <Input
                            placeholder={`Enter ${hashType.toUpperCase()} hash...`}
                            value={userHash}
                            onChange={(e) => setUserHash(e.target.value)}
                            className="font-mono text-xs"
                          />
                        </div>
                        <Button onClick={handleHashVerification} className="w-full">
                          <Shield className="mr-2 h-4 w-4" />
                          Verify Hash
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Step 3: Threat Assessment */}
            <TabsContent value="step-3" className="space-y-4">
              {selectedFile && (
                <Card>
                  <CardHeader>
                    <CardTitle>Threat Assessment Results</CardTitle>
                    <CardDescription>
                      Analysis of {selectedFile.name} against known threat databases
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {(['md5', 'sha1', 'sha256'] as const).map((hashType) => {
                      const hash = selectedFile[hashType];
                      const malwareSignature = checkMaliciousHash(hash);
                      
                      return (
                        <Alert 
                          key={hashType}
                          variant={malwareSignature ? 'destructive' : 'default'}
                        >
                          <div className="flex items-start gap-2">
                            {malwareSignature ? (
                              <XCircle className="h-5 w-5 text-destructive mt-0.5" />
                            ) : (
                              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            )}
                            <div className="space-y-1">
                              <div className="font-semibold uppercase text-sm">
                                {hashType} Analysis
                              </div>
                              <AlertDescription>
                                {malwareSignature ? (
                                  <>
                                    <strong>⚠️ THREAT DETECTED:</strong> {malwareSignature}
                                    <br />
                                    <span className="text-xs font-mono bg-muted px-1 rounded">
                                      {hash}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <strong>✅ CLEAN:</strong> No known threats detected
                                    <br />
                                    <span className="text-xs font-mono bg-muted px-1 rounded">
                                      {hash}
                                    </span>
                                  </>
                                )}
                              </AlertDescription>
                            </div>
                          </div>
                        </Alert>
                      );
                    })}

                    <div className="pt-4 border-t">
                      <Button className="w-full" onClick={() => setLabProgress(100)}>
                        <Download className="mr-2 h-4 w-4" />
                        Generate Forensic Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Lab Instructions Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lab Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2">Objective:</h4>
                  <p className="text-muted-foreground">
                    Learn to verify file integrity using cryptographic hash functions 
                    and identify potential security threats.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Tasks:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Select evidence files for analysis</li>
                    <li>• Compare hash values for integrity verification</li>
                    <li>• Check hashes against threat databases</li>
                    <li>• Generate forensic analysis report</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Hash Types:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li><strong>MD5:</strong> 128-bit (deprecated for security)</li>
                    <li><strong>SHA-1:</strong> 160-bit (legacy use)</li>
                    <li><strong>SHA-256:</strong> 256-bit (recommended)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Understand cryptographic hash functions</li>
                <li>✓ Verify file integrity and authenticity</li>
                <li>✓ Identify compromised or malicious files</li>
                <li>✓ Use hash databases for threat intelligence</li>
                <li>✓ Document forensic findings properly</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}