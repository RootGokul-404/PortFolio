import React, { useState } from "react";
import { AlertCircle, Bell, CheckCircle2, Cpu, Droplet, Radio, Thermometer, Wifi, X } from "lucide-react";

interface IotSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IotSimulatorModal({ isOpen, onClose }: IotSimulatorModalProps) {
  const [moisture, setMoisture] = useState(38); // %
  const [temperature, setTemperature] = useState(28); // °C
  const [motionDetected, setMotionDetected] = useState(false);

  if (!isOpen) return null;

  const isPumpActive = moisture < 40;
  const isAlarmTriggered = motionDetected;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-lg border border-white/10 bg-[#090d0b] shadow-2xl overflow-hidden font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#0c120f]">
          <div className="flex items-center gap-2.5 text-sm font-bold text-white">
            <Cpu className="h-4 w-4 text-[#c7ff40]" />
            <span>ESP32_TELEMETRY_SIMULATOR (NODE: #ESP32-DEV-01)</span>
          </div>

          <button onClick={onClose} className="rounded-sm p-1.5 text-slate-400 hover:bg-white/10 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-3 text-slate-300">
            <div className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-[#c7ff40] animate-pulse" />
              <span>TELEMETRY STREAM: CONNECTED VIA MQTT</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Wifi className="h-3.5 w-3.5" />
              <span>ONLINE (RSSI: -58 dBm)</span>
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Soil Moisture Sensor */}
            <div className="rounded-lg border border-white/10 bg-[#0c120f] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                  <Droplet className="h-4 w-4" />
                  <span>SOIL MOISTURE SENSOR</span>
                </span>
                <span className="text-white font-bold">{moisture}%</span>
              </div>

              <input
                type="range"
                min="10"
                max="100"
                value={moisture}
                onChange={(e) => setMoisture(Number(e.target.value))}
                className="w-full accent-[#c7ff40]"
              />

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-slate-500">THRESHOLD: 40%</span>
                <span className={`font-bold ${isPumpActive ? "text-amber-400 animate-pulse" : "text-emerald-400"}`}>
                  PUMP STATE: {isPumpActive ? "ACTIVE (IRRIGATING)" : "STANDBY (OPTIMAL)"}
                </span>
              </div>
            </div>

            {/* Temperature Sensor */}
            <div className="rounded-lg border border-white/10 bg-[#0c120f] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                  <Thermometer className="h-4 w-4" />
                  <span>DHT11 AMBIENT TEMP</span>
                </span>
                <span className="text-white font-bold">{temperature}°C</span>
              </div>

              <input
                type="range"
                min="15"
                max="50"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-slate-500">NORMAL RANGE: 20°C - 35°C</span>
                <span className={`font-bold ${temperature > 35 ? "text-rose-400" : "text-emerald-400"}`}>
                  {temperature > 35 ? "ALERT: HIGH TEMP" : "STATUS: NORMAL"}
                </span>
              </div>
            </div>
          </div>

          {/* PIR Motion Sensor Toggle */}
          <div className="rounded-lg border border-white/10 bg-[#0c120f] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-[#c7ff40]" />
              <div>
                <div className="text-white font-bold">PIR MOTION SENSOR (ALARM NODE)</div>
                <div className="text-[11px] text-slate-500">Simulate intrusion trigger event on GPIO 13</div>
              </div>
            </div>

            <button
              onClick={() => setMotionDetected(!motionDetected)}
              className={`rounded-sm px-4 py-2 font-bold transition-all ${
                motionDetected
                  ? "border border-rose-500 bg-rose-500/20 text-rose-300 animate-pulse"
                  : "border border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/30"
              }`}
            >
              {motionDetected ? "TRIGGERED (BUZZER ON)" : "TRIGGER MOTION"}
            </button>
          </div>

          {/* Real-time Hardware Console Log */}
          <div className="rounded border border-white/10 bg-[#050806] p-3 text-[11px] space-y-1 text-slate-400">
            <div className="text-slate-500 font-bold border-b border-white/5 pb-1">
              SERIAL TELEMETRY LOG (115200 BAUD)
            </div>
            <div>[INFO] Reading ADC Channel 4: Moisture Raw = {Math.round(moisture * 40.95)}</div>
            <div>[INFO] DHT11 Read: {temperature}.00 °C, Relative Humidity: 62%</div>
            {isPumpActive && <div className="text-amber-400">[TRIGGER] GPIO 18 HIGH &rarr; Water Relay Solenoid Engaged</div>}
            {isAlarmTriggered && <div className="text-rose-400">[ALARM] GPIO 13 HIGH &rarr; Buzzer Activated & Cloud Push Sent</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
