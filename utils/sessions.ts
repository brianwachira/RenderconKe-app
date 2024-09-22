import { ApiAllSessions, Session, Speaker } from '@/types';
import { allSessions } from '@/mock';
import { isDayOneSession, isDayTwoSession } from './formatDate';

export const formatSessions = (sessions: ApiAllSessions): Session[][] => {
  const allSessions = sessions.sessions.map((talk) => ({
    id: talk.id,
    title: talk.title,
    description: talk.description,
    startsAt: talk.startsAt,
    endsAt: talk.endsAt,
    isServiceSession: talk.isServiceSession,
    speakers: (talk.speakers?.map((speakerId) => sessions.speakers.find((sp) => sp.id === speakerId)).filter(Boolean) ||
      []) as Speaker[],
    room: sessions.rooms.find((room) => room.id === talk.roomId)?.name || '...',
  }));

  const dayOne = allSessions.filter((session) => isDayOneSession(session.startsAt));

  const dayTwo = allSessions.filter((session) => isDayTwoSession(session.startsAt));

  return [dayOne, dayTwo];
};

export const formatSession = (talk: ApiAllSessions['sessions'][number], sessions: typeof allSessions): Session => {
  return {
    id: talk.id,
    title: talk.title,
    description: talk.description,
    startsAt: talk.startsAt,
    endsAt: talk.endsAt,
    isServiceSession: talk.isServiceSession,
    speakers: (talk.speakers?.map((speakerId) => sessions.speakers.find((sp) => sp.id === speakerId)).filter(Boolean) ||
      []) as Speaker[],
    room: sessions.rooms.find((room) => room.id === talk.roomId)?.name || '...',
  };
};
