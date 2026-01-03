import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { parseVoterExcel, VoterExcelRow } from '@/utils/excelParser';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface VoterImportProps {
  boothId?: string;
}

const VoterImport: React.FC<VoterImportProps> = ({ boothId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [importStats, setImportStats] = useState<{ total: number; success: number; failed: number } | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImportStats(null);
    }
  };

  const importVoters = async () => {
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select an Excel file to import',
        variant: 'destructive',
      });
      return;
    }

    setIsImporting(true);
    setProgress(0);
    setImportStats(null);

    try {
      // Parse Excel file
      const voters = await parseVoterExcel(file);
      
      if (voters.length === 0) {
        toast({
          title: 'No data found',
          description: 'The Excel file appears to be empty or has no valid voter data',
          variant: 'destructive',
        });
        setIsImporting(false);
        return;
      }

      let successCount = 0;
      let failedCount = 0;
      const batchSize = 50;
      const batches = Math.ceil(voters.length / batchSize);

      for (let i = 0; i < batches; i++) {
        const batch = voters.slice(i * batchSize, (i + 1) * batchSize);
        
        const votersToInsert = batch.map((voter: VoterExcelRow) => ({
          name: voter.name,
          name_tamil: voter.name_tamil || null,
          voter_id: voter.voter_id || null,
          age: voter.age || null,
          gender: voter.gender || null,
          father_name: voter.father_name || null,
          father_name_tamil: voter.father_name_tamil || null,
          address: voter.address || null,
          door_number: voter.door_number || null,
          page_number: voter.page_number || null,
          booth_id: boothId || null,
          support_status: 'neutral' as const,
        }));

        const { error } = await supabase
          .from('voters')
          .insert(votersToInsert);

        if (error) {
          console.error('Batch insert error:', error);
          failedCount += batch.length;
        } else {
          successCount += batch.length;
        }

        setProgress(Math.round(((i + 1) / batches) * 100));
      }

      setImportStats({
        total: voters.length,
        success: successCount,
        failed: failedCount,
      });

      if (failedCount === 0) {
        toast({
          title: 'Import successful',
          description: `Successfully imported ${successCount} voters`,
        });
      } else {
        toast({
          title: 'Import completed with errors',
          description: `Imported ${successCount} voters, ${failedCount} failed`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: 'Import failed',
        description: 'An error occurred while importing the file',
        variant: 'destructive',
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Import Voters from Excel
        </CardTitle>
        <CardDescription>
          Upload an Excel file (.xlsx) containing voter data to import into the system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            disabled={isImporting}
            className="flex-1"
          />
          <Button
            onClick={importVoters}
            disabled={!file || isImporting}
            className="gap-2"
          >
            {isImporting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Import
              </>
            )}
          </Button>
        </div>

        {file && (
          <p className="text-sm text-muted-foreground">
            Selected: {file.name}
          </p>
        )}

        {isImporting && (
          <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-sm text-muted-foreground text-center">
              {progress}% complete
            </p>
          </div>
        )}

        {importStats && (
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Total records:</span>
              <span>{importStats.total}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>Successfully imported: {importStats.success}</span>
            </div>
            {importStats.failed > 0 && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span>Failed: {importStats.failed}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoterImport;
