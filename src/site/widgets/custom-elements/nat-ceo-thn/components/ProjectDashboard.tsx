import React from 'react';

export const ProjectDashboard: React.FC = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-grid">
                <div className="project-overview">
                    <div style={{backgroundColor: 'red'}}>
                    Project overview components
                    </div>
                </div>
                <div className="resource-allocation" style={{backgroundColor: 'blue'}}>
                    Resource allocation components
                </div>
                <div className="action-center" style={{backgroundColor: 'green'}}>
                    Action center components
                </div>
            </div>
        </div>
    );
};