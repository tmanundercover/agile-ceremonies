import React from 'react';
import CollapsibleSection from './CollapsibleSection';

const AgentCommunicationProtocol = ({ protocols, title = "Agent Communication Protocol", collapsible = false }) => {
  const ProtocolTable = () => (
    <>
      <h2>{title}</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Communication Type</th>
            <th>Protocol</th>
          </tr>
        </thead>
        <tbody>
          {protocols.map((protocol, index) => (
            <tr key={index}>
              <td>{protocol.type}</td>
              <td>{protocol.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  if (collapsible) {
    return (
      <CollapsibleSection title={title}>
        <ProtocolTable />
      </CollapsibleSection>
    );
  }

  return (
    <div id="communication-protocol">
      <ProtocolTable />
        <div>
            Communication Protocols:
            <ul>
                <li>Firebase Cloud Messaging</li>
                <li>Message Format?</li>
            </ul>
        </div>
    </div>
  );
};

export default AgentCommunicationProtocol;
