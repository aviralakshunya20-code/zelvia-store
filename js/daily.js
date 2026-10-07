// js/daily.js - Pure Daily Hunt calculations (Chapter 6.8, 9.4)
import { DAILY } from './data.js';

const EPOCH = Date.UTC(2026, 0, 1);

export function dayIndex(d = new Date()){
  const utcOfLocalDate = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.round((utcOfLocalDate - EPOCH) / 86400000);
}

export const dailyTarget    = (d = new Date()) => DAILY[((dayIndex(d) % 30) + 30) % 30];
export const dailyTolerance = t => Math.max(3, t * 0.05);
export const dailyOk        = (measured, target) => Math.abs(measured - target) <= dailyTolerance(target);

export function dayKey(d = new Date()){
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return d.getFullYear() + '-' + m + '-' + day;
}

export const keyOffset = (d, days) => dayKey(new Date(d.getFullYear(), d.getMonth(), d.getDate() + days));

export function applyDailySuccess(daily, todayKey, yesterdayKey){
  if (daily.lastDay === todayKey) return daily; // already done today
  daily.streak = daily.lastDay === yesterdayKey ? daily.streak + 1 : 1;
  daily.best = Math.max(daily.best, daily.streak);
  daily.lastDay = todayKey;
  return daily;
}
