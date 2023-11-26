import React, { useEffect, useState } from "react";

import Container from "../../../components/layouts/Container";
import Header from "../../../components/layouts/Header";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import api from "../../../config/api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function formatRupiah(int) {
    let rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(int);
    return rupiah.split(",")[0]; // remove the decimal part
}

export default function PagePesanan() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { t } = useTranslation();
    useEffect(() => {
        try {
            api.get("/pesanan")
                .then((res) => {
                    setProducts(res.data.data);
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
        <Container center>
            <Header admin />
            <h1 className="text-xl font-semibold text-dark">
                {t("orderList")}
            </h1>
            <DataTable
                value={products}
                tableStyle={{ minWidth: "50rem" }}
                className="overflow-hidden shadow-primary rounded-xl text-dark"
                onRowClick={(e) => {
                    navigate(`/invoice/${e.data._id}`);
                }}
                pt={{ bodyRow: { className: "cursor-pointer" } }}
                stripedRows
            >
                <Column
                    field="createdAt"
                    header="Tanggal"
                    body={(rowData) => {
                        const date = new Date(rowData.createdAt);
                        const day = date.getDate();
                        const month = date.getMonth();
                        const year = date.getFullYear();

                        const monthNames = [
                            t("Januari"),
                            t("Februari"),
                            t("Maret"),
                            t("April"),
                            t("Mei"),
                            t("Juni"),
                            t("Juli"),
                            t("Agustus"),
                            t("September"),
                            t("Oktober"),
                            t("November"),
                            t("Desember")
                        ];

                        const monthName = monthNames[month];

                        console.log(day, monthName, year);

                        return `${day} ${monthName} ${year}`;
                    }}
                />
                <Column field="namaMotif" header={t("Nama Motif")} />
                <Column field="namaPenerima" header={t("Nama Penerima")} />
                <Column field="kontakPenerima" header={t("recieverContact")} />
                <Column field="jumlah" header={t("totalOrder")} />
                <Column
                    field="totalHarga"
                    header="Total Bayar"
                    body={(rowData) => {
                        return <span>{formatRupiah(rowData.totalHarga)}</span>;
                    }}
                />
                <Column
                    field="metodePengiriman"
                    header="Metode Pengiriman"
                    body={(rowData) => {
                        return (
                            <span className="p-1 px-2 font-semibold text-blue-700 border border-blue-700 rounded-sm">
                                {rowData.metodePengiriman}
                            </span>
                        );
                    }}
                />
                <Column field="alamat" header={t("address")} />
            </DataTable>
        </Container>
    );
}
