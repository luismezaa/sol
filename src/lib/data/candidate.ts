'use server';

import { prisma } from '@/lib/db';
import { SafeCandidate, SafeCandidateWithParty } from '@/types';

interface IParams {
  candidateId?: string;
}

export async function getCandidates(): Promise<SafeCandidate[] | null> {
  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeCandidates = candidates.map((item) => ({
      ...item,
      proposals: JSON.stringify(item.proposals),
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return safeCandidates;
  } catch (error) {
    return null;
  }
}

export async function getCandidatesWithParty(): Promise<
  SafeCandidateWithParty[] | null
> {
  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        party: true,
      },
    });

    const safeCandidates = candidates.map((item) => ({
      ...item,
      proposals: JSON.stringify(item.proposals),
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      party: {
        ...item.party,
        createdAt: item.party?.createdAt.toISOString(),
        updatedAt: item.party?.updatedAt.toISOString(),
      },
    }));

    return safeCandidates as SafeCandidateWithParty[];
  } catch (error) {
    return null;
  }
}

export async function getCandidateById(
  params: IParams,
): Promise<SafeCandidate | null> {
  try {
    const { candidateId } = params;

    const candidate = await prisma.candidate.findUnique({
      where: {
        id: candidateId,
      },
    });

    if (!candidate) {
      return null;
    }

    return {
      ...candidate,
      proposals: JSON.stringify(candidate.proposals),
      createdAt: candidate.createdAt.toISOString(),
      updatedAt: candidate.updatedAt.toISOString(),
    };
  } catch (error) {
    return null;
  }
}

export async function getCandidatesByPartyId(params: {
  partyId?: string;
}): Promise<SafeCandidate[] | null> {
  const { partyId } = params;

  try {
    const candidates = await prisma.candidate.findMany({
      where: {
        partyId,
      },
    });

    if (!candidates) {
      return null;
    }

    const safeCandidates = candidates.map((item) => ({
      ...item,
      proposals: JSON.stringify(item.proposals),
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return safeCandidates;
  } catch (error) {
    return null;
  }
}

export async function getCandidatesByPositionId(params: {
  positionId?: string;
}): Promise<SafeCandidateWithParty[] | null> {
  const { positionId } = params;

  try {
    const candidates = await prisma.candidate.findMany({
      where: {
        positionId,
      },
      include: {
        party: true,
      },
    });

    if (!candidates) {
      return null;
    }

    const safeCandidates = candidates.map((item) => ({
      ...item,
      proposals: JSON.stringify(item.proposals),
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      party: {
        ...item.party,
        createdAt: item.party?.createdAt.toISOString(),
        updatedAt: item.party?.updatedAt.toISOString(),
      },
    }));

    return safeCandidates as SafeCandidateWithParty[];
  } catch (error) {
    return null;
  }
}
