import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { DrafPatient, Patient } from "./types";
import { v4 as uuidv4 } from "uuid";

type PatientState = {
    patients: Patient[];
    activeId: Patient["id"];
    addPatient: (patient: DrafPatient) => void;
    deletePatient: (id: Patient["id"]) => void;
    getPatientById: (id: Patient["id"]) => void;
    updatePatient: (data: DrafPatient) => void;
};

const cratePatient = (partient: DrafPatient): Patient => {
    return {
        id: uuidv4(),
        ...partient,
    };
};

export const usePatientStore = create<PatientState>()(
    devtools(
        persist(
            (set) => ({
                patients: [],
                activeId: "",
                addPatient: (patient) => {
                    const newPatient = cratePatient(patient);
                    set((state) => ({
                        patients: [...state.patients, newPatient],
                    }));
                },
                deletePatient: (id) => {
                    set((state) => ({
                        patients: state.patients.filter(
                            (patient) => patient.id !== id
                        ),
                    }));
                },
                getPatientById: (id) => {
                    set(() => ({
                        activeId: id,
                    }));
                },
                updatePatient: (data) => {
                    set((state) => ({
                        patients: state.patients.map((patient) =>
                            patient.id === state.activeId
                                ? { id: state.activeId, ...data }
                                : patient
                        ),
                        activeId: "",
                    }));
                },
            }),
            {
                name: "patient-storage",
            }
        )
    )
);
