import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
}

interface CarbonUnit {
  id: string;
  title: string;
  type: string;
  date: string;
  status: string;
  points: number;
}

interface PointsHistory {
  id: string;
  date: string;
  submissionId: string;
  points: number;
  type: "earned" | "redeemed";
}

interface CarbonStore {
  user: User;
  points: number;
  carbonUnits: CarbonUnit[];
  pointsHistory: PointsHistory[];
  addCarbonUnit: (unit: Omit<CarbonUnit, "id">) => void;
  cashoutPoints: (amount: number) => void;
  convertPoints: (amount: number, certificateQuantity: number) => void;
}

export const useStore = create<CarbonStore>()(
  persist(
    (set) => ({
      user: {
        id: "1",
        name: "Gerald Magala",
        email: "gerald.magala@example.com",
        isVerified: true
      },
      points: 10000,
      carbonUnits: [
        {
          id: "1",
          title: "Renewable Energy",
          type: "renewable",
          date: "1Feb 2025,08:47AM",
          status: "Approved",
          points: 500
        },
        {
          id: "2",
          title: "Nature-based",
          type: "nature-based",
          date: "1Feb 2025,08:47AM",
          status: "Pending",
          points: 300
        },
        {
          id: "3",
          title: "Renewable Energy",
          type: "renewable",
          date: "1Feb 2025,08:47AM",
          status: "Pending",
          points: 200
        },
        {
          id: "4",
          title: "Nature-based",
          type: "nature-based",
          date: "1Feb 2025,08:47AM",
          status: "Rejected",
          points: 0
        }
      ],
      pointsHistory: [
        {
          id: "1",
          date: "10Feb 2023,11:42 AM",
          submissionId: "151278",
          points: 21,
          type: "earned"
        },
        {
          id: "2",
          date: "5Feb 2023,04:41PM",
          submissionId: "151260",
          points: 21,
          type: "earned"
        },
        {
          id: "3",
          date: "1Feb 2023,07:42AM",
          submissionId: "151252",
          points: 79,
          type: "earned"
        },
        {
          id: "4",
          date: "30 Jan 2023,08:42AM",
          submissionId: "151251",
          points: 90,
          type: "earned"
        },
        {
          id: "5",
          date: "29 Jan 2023,07:45 AM",
          submissionId: "151240",
          points: 79,
          type: "earned"
        },
        {
          id: "6",
          date: "21 Jan 2023,12:27 PM",
          submissionId: "151239",
          points: 90,
          type: "earned"
        }
      ],
      addCarbonUnit: (unit) =>
        set((state) => ({
          carbonUnits: [
            {
              id: Date.now().toString(),
              ...unit
            },
            ...state.carbonUnits
          ],
          // Only add points if the status is Approved
          points:
            unit.status === "Approved"
              ? state.points + unit.points
              : state.points,
          // Add to points history if points were awarded
          pointsHistory:
            unit.status === "Approved"
              ? [
                  {
                    id: Date.now().toString(),
                    date: new Date().toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true
                    }),
                    submissionId: Math.floor(
                      150000 + Math.random() * 10000
                    ).toString(),
                    points: unit.points,
                    type: "earned"
                  },
                  ...state.pointsHistory
                ]
              : state.pointsHistory
        })),
      cashoutPoints: (amount) =>
        set((state) => ({
          points: Math.max(0, state.points - amount),
          pointsHistory: [
            {
              id: Date.now().toString(),
              date: new Date().toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
              }),
              submissionId: Math.floor(
                150000 + Math.random() * 10000
              ).toString(),
              points: amount,
              type: "redeemed"
            },
            ...state.pointsHistory
          ]
        })),
      convertPoints: (amount, certificateQuantity) =>
        set((state) => ({
          points: Math.max(0, state.points - amount),
          pointsHistory: [
            {
              id: Date.now().toString(),
              date: new Date().toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
              }),
              submissionId: `CERT-${Math.floor(10000 + Math.random() * 90000)}`,
              points: amount,
              type: "redeemed"
            },
            ...state.pointsHistory
          ]
        }))
    }),
    {
      name: "carbon-store",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
