import { DEVICE_DIMENSIONS } from '@/lib/constants';
export function PreviewFrame({ device, zoom = 100, children }) {
    const { width } = DEVICE_DIMENSIONS[device];
    const scale = zoom / 100;
    const scaledWidth = Math.min(width * scale, window.innerWidth - 48);
    return (<div className="flex flex-1 items-start justify-center overflow-auto bg-muted/30 p-6">
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-overlay transition-all duration-300" style={{ width: scaledWidth }}>
        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">{children}</div>
      </div>
    </div>);
}
export { DeviceSwitcher } from './DeviceSwitcher';
