import React, { Fragment, useEffect, useState } from "react";
import Container from "../../../components/layouts/Container";
import Header from "../../../components/layouts/Header";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { HiPlus } from "react-icons/hi2";
import { Dialog, Transition } from "@headlessui/react";
import ModalCreateIndustri from "../../../components/modal/ModalCreateIndustri";
import api from "../../../config/api";
import { useNavigate } from "react-router-dom";

export default function PageIndustriAdmin() {
    const [industriData, setIndustriData] = useState([]);
    const [modalIndustri, setModalIndustri] = useState(false);

    const navigate = useNavigate();

    const columns = [
        { field: "idIndustri", header: "ID" },
        { field: "namaIndustri", header: "Nama Industri" },
        { field: "pemilik", header: "Nama Pemilik" },
        { field: "kontak", header: "Kontak" },
        { field: "alamat", header: "Alamat" }
    ];

    useEffect(() => {
        try {
            api.get("/industri")
                .then((res) => {
                    setIndustriData(res.data.data);
                    console.log(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <ModalCreateIndustri
                modalIndustri={modalIndustri}
                setModalIndustri={setModalIndustri}
            />
            <Container center>
                <Header admin />
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold text-dark">
                        Daftar Industri
                    </h1>
                    <button
                        className="px-4 py-2 text-white rounded-lg bg-primary-500 shadow-primary hover:bg-primary-600"
                        onClick={() => setModalIndustri(true)}
                    >
                        <HiPlus className="inline-block w-5 h-5 mr-2" />
                        Buat Industri
                    </button>
                </div>
                <DataTable
                    value={industriData}
                    tableStyle={{ minWidth: "50rem" }}
                    className="overflow-hidden shadow-primary rounded-xl text-dark"
                    onRowClick={(e) => {
                        navigate(`/admin/industri/edit/${e.data.idIndustri}`);
                    }}
                >
                    {columns.map((col, i) => (
                        <Column key={i} field={col.field} header={col.header} />
                    ))}
                </DataTable>
            </Container>
        </>
    );
}
