import { create } from 'zustand';
import { CATEGORIES, CategoryKey } from '@/lib/data';

export type Phase = 'setup' | 'reveal' | 'action';
export type Role = 'innocent' | 'imposter';

export interface Player {
    id: number;
    role: Role;
}

interface GameState {
    phase: Phase;
    settings: {
        playerCount: number;
        imposterCount: number;
        category: CategoryKey;
    };
    players: Player[];
    secretWord: string;
    currentRevealIndex: number;
    startingPlayer: number | null;

    setSettings: (settings: Partial<GameState['settings']>) => void;
    startGame: () => void;
    nextReveal: () => void;
    resetGame: () => void;
    spinWheel: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
    phase: 'setup',
    settings: {
        playerCount: 3,
        imposterCount: 1,
        category: 'Food',
    },
    players: [],
    secretWord: '',
    currentRevealIndex: 0,
    startingPlayer: null,

    setSettings: (newSettings) =>
        set((state) => ({
            settings: { ...state.settings, ...newSettings },
        })),

    startGame: () => {
        const { settings } = get();
        const { playerCount, imposterCount, category } = settings;

        // Select secret word
        const words = CATEGORIES[category];
        const secretWord = words[Math.floor(Math.random() * words.length)];

        // Assign roles
        const roles: Role[] = Array(playerCount).fill('innocent');
        let impostersAssigned = 0;
        while (impostersAssigned < imposterCount) {
            const idx = Math.floor(Math.random() * playerCount);
            if (roles[idx] === 'innocent') {
                roles[idx] = 'imposter';
                impostersAssigned++;
            }
        }

        const players = roles.map((role, index) => ({
            id: index + 1,
            role,
        }));

        set({
            phase: 'reveal',
            players,
            secretWord,
            currentRevealIndex: 0,
            startingPlayer: null,
        });
    },

    nextReveal: () => {
        const { currentRevealIndex, players } = get();
        if (currentRevealIndex < players.length - 1) {
            set({ currentRevealIndex: currentRevealIndex + 1 });
        } else {
            set({ phase: 'action' });
        }
    },

    spinWheel: () => {
        const { players } = get();
        const randomPlayerIndex = Math.floor(Math.random() * players.length);
        set({ startingPlayer: players[randomPlayerIndex].id });
    },

    resetGame: () => {
        set({
            phase: 'setup',
            players: [],
            secretWord: '',
            currentRevealIndex: 0,
            startingPlayer: null,
        });
    },
}));
