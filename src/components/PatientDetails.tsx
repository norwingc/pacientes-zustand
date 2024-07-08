import { Patient } from "../types";
import PatientDetailsItem from "./PatientDetailsItem";
import { usePatientStore } from "../store";
import { toast } from "react-toastify";

type PatientDetailsProps = {
    patient: Patient;
};

export default function PatientDetails({ patient }: PatientDetailsProps) {
    const deletePatient = usePatientStore((state) => state.deletePatient);
    const getPatientById = usePatientStore((state) => state.getPatientById);

    const handleClick = () => {
        deletePatient(patient.id);
        toast.error("Paciente eliminado correctamente");
    };

    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PatientDetailsItem label="ID" data={patient.id} />
            <PatientDetailsItem label="Nombre" data={patient.name} />
            <PatientDetailsItem label="Propietario" data={patient.caretaker} />
            <PatientDetailsItem label="Email" data={patient.email} />
            <PatientDetailsItem
                label="Fecha Alta"
                data={patient.date.toString()}
            />
            <PatientDetailsItem label="Síntomas" data={patient.symptoms} />

            <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                    onClick={() => getPatientById(patient.id)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                    onClick={handleClick}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}
