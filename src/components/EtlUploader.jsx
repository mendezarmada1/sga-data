import React, { useState } from 'react';
import { Upload, FileUp, Download, AlertCircle, CheckCircle } from 'lucide-react';

const EtlUploader = () => {
    const [csvFile, setCsvFile] = useState(null);
    const [xlsxFile, setXlsxFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const [message, setMessage] = useState('');

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (type === 'csv') setCsvFile(file);
        if (type === 'xlsx') setXlsxFile(file);
        setStatus(null);
        setMessage('');
    };

    const handleUpload = async () => {
        if (!csvFile || !xlsxFile) {
            setStatus('error');
            setMessage('Please select both CSV and XLSX files.');
            return;
        }

        setLoading(true);
        setStatus(null);
        setMessage('Processing files... This may take a moment.');

        const formData = new FormData();
        formData.append('csv_file', csvFile);
        formData.append('xlsx_file', xlsxFile);

        try {
            // Assuming API request to localhost:8000 
            // Adjust URL if deployed elsewhere
            const response = await fetch('http://localhost:8000/unify', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Upload failed');
            }

            // Handle Blob response for download
            const blob = await response.blob();

            // Extract filename from header
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = 'Unified_Output.xlsx';
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
                if (filenameMatch && filenameMatch.length === 2) {
                    filename = filenameMatch[1];
                }
            }

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            setStatus('success');
            setMessage('Files processed successfully! Downloading Report...');
        } catch (error) {
            console.error('Upload Error:', error);
            setStatus('error');
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100 mt-10">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                    <FileUp className="w-6 h-6 text-blue-600" />
                    ETL Data Unifier
                </h2>
                <p className="text-gray-500 mt-2">Upload your raw files to generate the Unified Report</p>
            </div>

            <div className="space-y-6">
                {/* CSV Input */}
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 hover:border-blue-400 transition-colors">
                    <label className="block cursor-pointer">
                        <span className="block text-sm font-medium text-gray-700 mb-2">1. Upload CSV File</span>
                        <input
                            type="file"
                            accept=".csv"
                            onChange={(e) => handleFileChange(e, 'csv')}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {csvFile && <p className="mt-2 text-sm text-green-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> {csvFile.name}</p>}
                    </label>
                </div>

                {/* Excel Input */}
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 hover:border-green-400 transition-colors">
                    <label className="block cursor-pointer">
                        <span className="block text-sm font-medium text-gray-700 mb-2">2. Upload Excel File</span>
                        <input
                            type="file"
                            accept=".xlsx"
                            onChange={(e) => handleFileChange(e, 'xlsx')}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        />
                        {xlsxFile && <p className="mt-2 text-sm text-green-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> {xlsxFile.name}</p>}
                    </label>
                </div>

                {/* Status Messages */}
                {status === 'error' && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        {message}
                    </div>
                )}
                {status === 'success' && (
                    <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        {message}
                    </div>
                )}

                {/* Action Button */}
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className={`w-full py-4 rounded-lg font-bold text-white shadow-md transition-all flex items-center justify-center gap-2
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'}
          `}
                >
                    {loading ? (
                        <>Processing...</>
                    ) : (
                        <>
                            <Download className="w-5 h-5" />
                            Process & Download Report
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default EtlUploader;
