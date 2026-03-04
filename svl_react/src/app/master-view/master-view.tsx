import { useState, useRef } from 'react';
import styles from './master-view.module.css';
import createClassTransformer from '../style-utils';
import '/src/app/base-view-styles.css';
import {
  IgrNavDrawer,
  IgrNavDrawerItem,
  IgrCard,
  IgrCardHeader,
  IgrCardContent,
  IgrTabs,
  IgrTab,
  IgrButton,
  IgrLinearProgress,
  IgrIconButton,
  IgrDropdown,
  IgrDropdownItem,
} from '@infragistics/igniteui-react';
import { IgrCategoryChart, IgrCategoryChartModule } from '@infragistics/igniteui-react-charts';
import { registerIconFromText } from '@infragistics/igniteui-react';
import { openTasksData, myTasksData, statusCards, navItems, workspaces } from '../data/sample-data';

IgrCategoryChartModule.register();

registerIconFromText(
  'edit',
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',
  'material'
);
registerIconFromText(
  'auto_awesome',
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/></svg>',
  'material'
);
registerIconFromText(
  'notifications',
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>',
  'material'
);
registerIconFromText(
  'chat_bubble_outline',
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>',
  'material'
);
registerIconFromText(
  'people_outline',
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-10v-1.25c0-.54 2.56-1.75 5-1.75s5 1.21 5 1.75v1.25zm9 0H14v-1.25c0-.46-.2-.86-.52-1.22.88-.3 1.96-.53 3.02-.53 2.44 0 5 1.21 5 1.75v1.25zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/></svg>',
  'material'
);
registerIconFromText(
  'apps',
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>',
  'material'
);
registerIconFromText(
  'group_work',
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9.5 8c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8zm6.5 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
  'material'
);
registerIconFromText(
  'trending_up',
  '<svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>',
  'material'
);

const statusIconMap: Record<string, { bg: string; color: string; icon: string }> = {
  danger: { bg: '#fee2e2', color: '#dc2626', icon: 'error_outline' },
  warning: { bg: '#fef3c7', color: '#f59e0b', icon: 'warning_amber' },
  success: { bg: '#d1fae5', color: '#10b981', icon: 'check_circle_outline' },
};

const allProjects = [
  { name: 'Product Roadmap' },
  { name: 'Another Project' },
  { name: 'Yet one more' },
];

export default function MasterView() {
  const classes = createClassTransformer(styles);
  const [expandedWorkspaces, setExpandedWorkspaces] = useState<Record<string, boolean>>({ Creative: true });
  const [selectedProject, setSelectedProject] = useState('Product Roadmap');
  const headerDropdownRef = useRef<IgrDropdown>(null);

  const toggleWorkspace = (name: string) => {
    setExpandedWorkspaces(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className={classes("row-layout master-view-container")}>
      {/* LEFT SIDEBAR — brand/create/search outside NavDrawer (no header slot exists) */}
      <div className={classes("sidebar")}>
        <div className={classes("sidebar-header")}>
          <div className={classes("brand-row")}>
            <span className="material-icons" style={{ fontSize: 24, color: 'var(--app-text-primary)' }}>menu</span>
            <div className={classes("brand-logo")}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#6366f1"/>
              </svg>
              <span className={classes("brand-text")}>Slingshot</span>
            </div>
          </div>
        </div>

        <div className={classes("sidebar-actions")}>
          <button className={classes("create-btn")}>
            <span className="material-icons" style={{ fontSize: 18 }}>add</span>
            Create
          </button>
          <div className={classes("search-row")}>
            <span className="material-icons" style={{ fontSize: 20, color: 'var(--app-text-secondary)' }}>search</span>
          </div>
        </div>

        <IgrNavDrawer open={true} position="relative" className={classes("nav-drawer")}>
          {navItems.map((item) => (
            <IgrNavDrawerItem key={item.label} active={item.active}>
              <span slot="icon" className="material-icons" style={{ fontSize: 20 }}>{item.icon}</span>
              <span slot="content">{item.label}</span>
            </IgrNavDrawerItem>
          ))}
        </IgrNavDrawer>

        <div className={classes("more-link")}>More...</div>

        <div className={classes("workspaces-section")}>
          <div className={classes("workspaces-label")}>WORKSPACES</div>
          {workspaces.map((ws) => {
            const hasProjects = 'projects' in ws && ws.projects;
            const isExpanded = expandedWorkspaces[ws.name] ?? false;
            return (
              <div key={ws.name}>
                <div
                  className={classes(isExpanded && hasProjects ? "workspace-item workspace-item-expanded" : "workspace-item")}
                  onClick={() => hasProjects && toggleWorkspace(ws.name)}
                >
                  <div className={classes("workspace-avatar-circle")} style={{ backgroundColor: ws.color }}>
                    {ws.initial}
                  </div>
                  <span className={classes("workspace-name")}>{ws.name}</span>
                  {hasProjects && (
                    <span
                      className="material-icons"
                      style={{
                        fontSize: 18,
                        color: 'var(--app-text-secondary)',
                        marginLeft: 'auto',
                        transition: 'transform 0.2s',
                        transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                      }}
                    >
                      keyboard_arrow_down
                    </span>
                  )}
                </div>
                {hasProjects && isExpanded && (
                  <div className={classes("workspace-projects")}>
                    {ws.projects!.map((proj) => (
                      <div key={proj.name} className={classes(proj.active ? "project-item project-item-active" : "project-item")}>
                        {proj.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={classes("sidebar-footer")}>
          <IgrIconButton name="people_outline" collection="material" variant="flat" />
          <IgrIconButton name="apps" collection="material" variant="flat" />
          <IgrIconButton name="group_work" collection="material" variant="flat" />
        </div>
      </div>

      {/* RIGHT MAIN AREA */}
      <div className={classes("main-content")}>
        <div className={classes("header-bar")}>
          <div className={classes("header-left")}>
            <div className={classes("header-badge")}>C</div>
            <span className={classes("breadcrumb-sep")}>/</span>
            <IgrDropdown ref={headerDropdownRef} placement="bottom-start" onChange={(e: CustomEvent) => {
              const val = e.detail?.value;
              if (val) setSelectedProject(val);
            }}>
              <button slot="target" className={classes("header-dropdown-trigger")}>
                <span className={classes("header-title")}>{selectedProject}</span>
                <span className="material-icons" style={{ fontSize: 20, color: 'var(--app-text-secondary)' }}>arrow_drop_down</span>
              </button>
              {allProjects.map((p) => (
                <IgrDropdownItem key={p.name} value={p.name} selected={p.name === selectedProject}>
                  {p.name}
                </IgrDropdownItem>
              ))}
            </IgrDropdown>
          </div>
          <div className={classes("header-right")}>
            <IgrIconButton name="auto_awesome" collection="material" variant="flat" />
            <IgrIconButton name="notifications" collection="material" variant="flat" />
            <IgrIconButton name="chat_bubble_outline" collection="material" variant="flat" />
            <div className={classes("user-avatar-circle")}></div>
          </div>
        </div>

        <IgrTabs className={classes("tab-nav")}>
          <IgrTab label="Overview">
            <div className={classes("content-area")}>
              <div className={classes("overview-header")}>
                <h1 className={classes("overview-title")}>Project Overview</h1>
                <IgrButton variant="outlined" className={classes("edit-btn")}>
                  <span className="material-icons" style={{ fontSize: 18, marginRight: 4 }}>edit</span>
                  Edit
                </IgrButton>
              </div>

              <div className={classes("card-grid")}>
                {statusCards.map((card) => {
                  const iconInfo = statusIconMap[card.status];
                  return (
                    <IgrCard key={card.title} className={classes("status-card")}>
                      <IgrCardHeader>
                        <span slot="title" className={classes("card-title")}>{card.title}</span>
                      </IgrCardHeader>
                      <div className={classes("status-icon-container")} style={{ backgroundColor: iconInfo.bg }}>
                        <span className="material-icons" style={{ fontSize: 24, color: iconInfo.color }}>{iconInfo.icon}</span>
                      </div>
                      <IgrCardContent>
                        <div className={classes("card-count")}>{card.count}</div>
                        <div className={classes("card-description")}>{card.description}</div>
                      </IgrCardContent>
                    </IgrCard>
                  );
                })}

                <IgrCard className={classes("chart-card")}>
                  <IgrCardHeader>
                    <span slot="title" className={classes("card-title")}>Open Tasks</span>
                  </IgrCardHeader>
                  <IgrCardContent>
                    <div className={classes("chart-wrapper")}>
                      <IgrCategoryChart
                        dataSource={openTasksData}
                        chartType="column"
                        brushes={['#6366f1', '#8b5cf6']}
                        outlines={['#6366f1', '#8b5cf6']}
                        xAxisFormatLabel={(item: Record<string, unknown>) => String(item?.day ?? '')}
                        isHorizontalZoomEnabled={false}
                        isVerticalZoomEnabled={false}
                        yAxisMinimumValue={0}
                        yAxisMaximumValue={100}
                        xAxisLabelVisibility="collapsed"
                        yAxisLabelVisibility="collapsed"
                        xAxisMajorStrokeThickness={0}
                        yAxisMajorStrokeThickness={0}
                        xAxisStrokeThickness={0}
                        yAxisStrokeThickness={0}
                        xAxisTickLength={0}
                        yAxisTickLength={0}
                        plotAreaMarginLeft={0}
                        plotAreaMarginRight={0}
                        plotAreaMarginTop={10}
                        plotAreaMarginBottom={0}
                        toolTipType="none"
                      />
                    </div>
                    <div className={classes("chart-footer")}>
                      <span className={classes("chart-label")}>Last 7 days</span>
                      <span className={classes("chart-trend")}>
                        <IgrIconButton name="trending_up" collection="material" variant="flat" className={classes("trend-icon")} />
                        <span className={classes("trend-value")}>+12%</span>
                      </span>
                    </div>
                  </IgrCardContent>
                </IgrCard>

                <IgrCard className={classes("members-card")}>
                  <IgrCardHeader>
                    <span slot="title" className={classes("card-title")}>Members</span>
                  </IgrCardHeader>
                  <IgrCardContent>
                    <div className={classes("progress-wrapper")}>
                      <IgrLinearProgress value={90} className={classes("members-progress")} />
                    </div>
                  </IgrCardContent>
                </IgrCard>

                <IgrCard className={classes("chart-card")}>
                  <IgrCardHeader>
                    <span slot="title" className={classes("card-title")}>My Tasks By Status</span>
                  </IgrCardHeader>
                  <IgrCardContent>
                    <div className={classes("chart-wrapper")}>
                      <IgrCategoryChart
                        dataSource={myTasksData}
                        chartType="column"
                        brushes={['#6366f1', '#8b5cf6']}
                        outlines={['#6366f1', '#8b5cf6']}
                        xAxisFormatLabel={(item: Record<string, unknown>) => String(item?.day ?? '')}
                        isHorizontalZoomEnabled={false}
                        isVerticalZoomEnabled={false}
                        yAxisMinimumValue={0}
                        yAxisMaximumValue={100}
                        xAxisLabelVisibility="collapsed"
                        yAxisLabelVisibility="collapsed"
                        xAxisMajorStrokeThickness={0}
                        yAxisMajorStrokeThickness={0}
                        xAxisStrokeThickness={0}
                        yAxisStrokeThickness={0}
                        xAxisTickLength={0}
                        yAxisTickLength={0}
                        plotAreaMarginLeft={0}
                        plotAreaMarginRight={0}
                        plotAreaMarginTop={10}
                        plotAreaMarginBottom={0}
                        toolTipType="none"
                      />
                    </div>
                    <div className={classes("chart-footer")}>
                      <span className={classes("chart-label")}>Last 7 days</span>
                      <span className={classes("chart-trend")}>
                        <IgrIconButton name="trending_up" collection="material" variant="flat" className={classes("trend-icon")} />
                        <span className={classes("trend-value")}>+12%</span>
                      </span>
                    </div>
                  </IgrCardContent>
                </IgrCard>
              </div>
            </div>
          </IgrTab>
          <IgrTab label="Tasks">
            <div className={classes("content-area")}>
              <span style={{ padding: 24, display: 'block', color: 'var(--app-text-secondary)' }}>Tasks content</span>
            </div>
          </IgrTab>
          <IgrTab label="Discussions">
            <div className={classes("content-area")}>
              <span style={{ padding: 24, display: 'block', color: 'var(--app-text-secondary)' }}>Discussions content</span>
            </div>
          </IgrTab>
          <IgrTab label="Pins">
            <div className={classes("content-area")}>
              <span style={{ padding: 24, display: 'block', color: 'var(--app-text-secondary)' }}>Pins content</span>
            </div>
          </IgrTab>
          <IgrTab label="Dashboards">
            <div className={classes("content-area")}>
              <span style={{ padding: 24, display: 'block', color: 'var(--app-text-secondary)' }}>Dashboards content</span>
            </div>
          </IgrTab>
        </IgrTabs>
      </div>
    </div>
  );
}
