import React, { Fragment, useEffect, useState } from "react";
import Container from "../../../components/layouts/Container";
import Header from "../../../components/layouts/Header";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { HiPlus } from "react-icons/hi2";
import { Dialog, Transition } from "@headlessui/react";
import ModalCreateIndustri from "../../../components/modal/ModalCreateIndustri";

export default function PageIndustri() {
    const [products, setProducts] = useState([]);
    const [modalIndustri, setModalIndustri] = useState(false);

    const columns = [
        { field: "date", header: "Tanggal" },
        { field: "motif", header: "Nama Motif" },
        { field: "receiver", header: "Nama Penerima" },
        { field: "whatsapp", header: "Whatsapp Penerima" },
        { field: "amount", header: "Jumlah Pesanan" },
        {
            field: "shipment",
            header: "Metode Pengiriman",
            body: (rowData) => {
                return (
                    <span className="p-1 px-2 font-semibold border rounded-sm text-primary-700 border-primary-700">
                        {rowData.shipment}
                    </span>
                );
            }
        },
        { field: "address", header: "Alamat" }
    ];

    const data = [
        {
            date: "12/12/2021",
            motif: "Motif 1",
            receiver: "Budi",
            whatsapp: "081234567890",
            amount: "10",
            shipment: "JNE",
            address: "Jl. Sulawesi No. 1"
        },
        {
            date: "12/12/2021",
            motif: "Motif 1",
            receiver: "Budi",
            whatsapp: "081234567890",
            amount: "10",
            shipment: "JNE",
            address: "Jl. Sulawesi No. 1"
        },
        {
            date: "12/12/2021",
            motif: "Motif 1",
            receiver: "Budi",
            whatsapp: "081234567890",
            amount: "10",
            shipment: "JNE",
            address: "Jl. Sulawesi No. 1"
        },
        {
            date: "12/12/2021",
            motif: "Motif 1",
            receiver: "Budi",
            whatsapp: "081234567890",
            amount: "10",
            shipment: "JNE",
            address: "Jl. Sulawesi No. 1"
        },
        {
            date: "12/12/2021",
            motif: "Motif 1",
            receiver: "Budi",
            whatsapp: "081234567890",
            amount: "10",
            shipment: "JNE",
            address: "Jl. Sulawesi No. 1"
        }
    ];

    useEffect(() => {
        setProducts(data);
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
                    value={products}
                    tableStyle={{ minWidth: "50rem" }}
                    className="overflow-hidden shadow-primary rounded-xl text-dark"
                >
                    {columns.map((col, i) => (
                        <Column
                            key={col.field}
                            field={col.field}
                            header={col.header}
                            body={col.body}
                        />
                    ))}
                </DataTable>
            </Container>
        </>
    );
}
