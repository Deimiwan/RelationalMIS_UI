import { usePermissions } from '../access/use-permissions';
import { DASHBOARD_WIDGETS } from './widget-registry';

export const DashboardPage = () => {
  const { can } = usePermissions();

  const visible = DASHBOARD_WIDGETS.filter((widget) =>
    Array.isArray(widget.required) ? widget.required.some((p) => can(p)) : can(widget.required),
  );

  return (
    <main className="page">
      <h2>Dashboard</h2>
      <p>Widgets are rendered from permission checks.</p>
      <div className="widget-grid">
        {visible.map((w) => (
          <section className="widget" key={w.title}>
            <h4>{w.title}</h4>
            <p>{w.description}</p>
          </section>
        ))}
      </div>
    </main>
  );
};
