import React, { useState } from 'react';
import { ProjectData } from '../types';

export const ProjectInitializationForm: React.FC = () => {
    const [projectData, setProjectData] = useState<ProjectData>({
        projectName: '',
        description: '',
        resources: [],
        team: []
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/project/initialize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData)
            });
            // Handle response
        } catch (error) {
            console.error('Project initialization failed:', error);
        }
    };

    return (
        <div className="project-init-form">
            <h2>Initialize New Project</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={projectData.projectName}
                    onChange={(e) => setProjectData({
                        ...projectData,
                        projectName: e.target.value
                    })}
                    placeholder="Project Name"
                />
                {/* Add other form fields */}
            </form>
        </div>
    );
};