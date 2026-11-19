import React from 'react';
import { useConfiguratorStore } from '../../store/configuratorStore';
import {
  formatArsFromEur,
  formatRateTimestamp,
  useEurToArsRate,
} from '../../hooks/useEurToArsRate';

export const SOWTemplate = React.forwardRef<HTMLDivElement, { company: string; name: string }>(
  ({ company, name }, ref) => {
    const availableModules = useConfiguratorStore((state) => state.availableModules);
    const selectedModuleIds = useConfiguratorStore((state) => state.selectedModuleIds);
    const totalInversion = useConfiguratorStore((state) => state.totalPrice);
    const selectedModules = availableModules.filter((m) => selectedModuleIds.includes(m.id));
    const { rate: eurArsRate, updatedAt } = useEurToArsRate();

    // Fixed A4 size in pixels for 96 DPI: 794px by 1123px
    // 100% inline hex/rgba styles so html2canvas never parses Tailwind v4 oklab/oklch functions
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -50,
          opacity: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          ref={ref}
          style={{
            width: '794px',
            minHeight: '1123px',
            backgroundColor: '#ffffff',
            color: '#09090b',
            padding: '48px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          }}
        >
          {/* Header */}
          <div
            style={{
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              paddingBottom: '28px',
              marginBottom: '32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: '42px',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  margin: '0 0 8px 0',
                  color: '#09090b',
                  lineHeight: 1,
                }}
              >
                GLASTOR®
              </h1>
              <p
                style={{
                  color: '#52525b',
                  fontSize: '13px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                Statement of Work (SOW)
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p
                style={{
                  color: '#00a843',
                  fontWeight: 700,
                  fontSize: '14px',
                  margin: 0,
                }}
              >
                FECHA: {new Date().toLocaleDateString('es-AR')}
              </p>
              <p
                style={{
                  color: '#52525b',
                  fontSize: '11px',
                  margin: '4px 0 0 0',
                }}
              >
                VÁLIDO POR 15 DÍAS
              </p>
            </div>
          </div>

          {/* Client Info */}
          <div style={{ marginBottom: '40px' }}>
            <p
              style={{
                color: '#52525b',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                margin: '0 0 4px 0',
              }}
            >
              PREPARADO PARA
            </p>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#09090b',
                margin: '0 0 4px 0',
              }}
            >
              {company || 'Cliente B2B'}
            </h2>
            <p style={{ color: '#3f3f46', fontSize: '14px', margin: 0 }}>
              Atención: {name || 'Equipo Técnico'}
            </p>
          </div>

          {/* Modules Table */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                color: '#00a843',
                fontSize: '13px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700,
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                paddingBottom: '8px',
                margin: '0 0 16px 0',
              }}
            >
              MÓDULOS DE ARQUITECTURA SELECCIONADOS
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {selectedModules.length === 0 ? (
                <p style={{ color: '#52525b', fontSize: '13px', fontStyle: 'italic' }}>
                  Ningún módulo seleccionado.
                </p>
              ) : (
                selectedModules.map((module) => (
                  <div
                    key={module.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                      paddingBottom: '14px',
                    }}
                  >
                    <div style={{ paddingRight: '28px' }}>
                      <h4
                        style={{
                          fontWeight: 700,
                          fontSize: '16px',
                          margin: '0 0 4px 0',
                          color: '#09090b',
                        }}
                      >
                        {module.title}
                      </h4>
                      <p
                        style={{
                          color: '#52525b',
                          fontSize: '12px',
                          maxWidth: '480px',
                          margin: 0,
                          lineHeight: 1.5,
                        }}
                      >
                        {module.description}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p
                        style={{
                          color: '#09090b',
                          fontWeight: 700,
                          fontSize: '14px',
                          margin: 0,
                        }}
                      >
                        €{module.base_price?.toLocaleString() || 0} EUR
                      </p>
                      {eurArsRate && (
                        <p
                          style={{
                            color: '#52525b',
                            fontSize: '11px',
                            margin: '3px 0 0 0',
                          }}
                        >
                          ≈ {formatArsFromEur(module.base_price || 0, eurArsRate)}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Totals */}
          <div
            style={{
              marginTop: '40px',
              borderTop: '1px solid rgba(0, 0, 0, 0.12)',
              paddingTop: '28px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <div
              style={{
                width: '55%',
                backgroundColor: '#f4f4f5',
                padding: '24px',
                border: '1px solid rgba(0, 0, 0, 0.12)',
              }}
            >
              <p
                style={{
                  color: '#52525b',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  margin: '0 0 8px 0',
                }}
              >
                INVERSIÓN TOTAL ESTIMADA
              </p>
              <p
                style={{
                  fontSize: '34px',
                  fontWeight: 900,
                  color: '#00a843',
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                €{totalInversion.toLocaleString()} EUR
              </p>
              {eurArsRate && (
                <div
                  style={{
                    marginTop: '10px',
                    paddingTop: '10px',
                    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                  }}
                >
                  <p
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#09090b',
                      margin: 0,
                    }}
                  >
                    ≈ {formatArsFromEur(totalInversion, eurArsRate)}
                  </p>
                  <p
                    style={{
                      color: '#52525b',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      margin: '4px 0 0 0',
                    }}
                  >
                    Euro Oficial (venta): $
                    {eurArsRate.toLocaleString('es-AR', { maximumFractionDigits: 2 })} ARS
                    {updatedAt ? ` (${formatRateTimestamp(updatedAt)})` : ''}
                  </p>
                </div>
              )}
              <p
                style={{
                  color: '#52525b',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  margin: '16px 0 0 0',
                  lineHeight: 1.4,
                }}
              >
                * Los costos de infraestructura Cloud (AWS/GCP) se facturan por separado según
                consumo.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: 'auto',
              paddingTop: '40px',
              borderTop: '1px solid rgba(0, 0, 0, 0.12)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '11px',
              color: '#52525b',
            }}
          >
            <p style={{ margin: 0 }}>CONFIDENCIAL - GLASTOR® 2026</p>
            <p style={{ margin: 0 }}>www.glastor.es | founder@glastor.es</p>
          </div>
        </div>
      </div>
    );
  },
);

SOWTemplate.displayName = 'SOWTemplate';
