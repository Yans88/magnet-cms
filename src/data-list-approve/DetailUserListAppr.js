import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {
    addDataSuccess,
    addForm,
    approveData,
    fetchDataDetail,
    fetchDataError,
    fetchDataLoading,
    rejectData,
    showConfirmApprove,
} from "../data-user-cabinet/dataUserService";
import {Button, Form} from "react-bootstrap";
import {AppSwalSuccess} from "../components/modal/SwalSuccess";
import NumberFormat from "react-number-format";
import AppModal from "../components/modal/MyModal";

class DetailUserListAppr extends Component {
    constructor(props) {
        super(props);

        this.dataErr = {
            data_pribadi: {},
        };

        this.dataKekayaanErr = {
            kekayaan: {},
        };

        this.dataKontakDaruratErr = {
            kontak_darurat: {},
        };

        this.dataPekerjaanErr = {
            data_pekerjaan: {},
        };

        this.dataAkunBankErr = {
            akun_bank: {},
        };

        this.dataPengalamanTradingErr = {
            pengalaman_trading: {},
        };
        this.dokumenErr = {
            arr_dokumen: {},
        };

        this.dataPribadi = {};
        this.informasiKelengkapan = {
            data_pribadi: {
                data_pribadi_id: "",
                nama_depan: "",
                nama_belakang: "",
                nama_pasangan: "",
                tempat_lahir: "",
                kota_lahir: "",
                tanggal_lahir: "",
                no_identitas: "",
                jenis_identitas: "",
                npwp: "",
                jenis_kelamin: "",
                status_pernikahan: "",
                nama_ibu_kandung: "",
                alamat: "",
                rt: "",
                rw: "",
                provinsi: "",
                warga_negara: "",
                telp: "",
                fax: "",
                handphone: "",
                status_kepemilikan: "",
                agree: "",
            },
            kekayaan: {
                kekayaan_id: "",
                pendapatan_pertahun: "",
                lokasi: "",
                njop: "",
                deposit_bank: "",
                lainnya: "",
                agree: "",
            },
            kontak_darurat: {
                kontak_id: "",
                nama: "",
                alamat: "",
                kode_pos: "",
                telp: "",
                handphone: "",
                hubungan: "",
                agree: "",
            },
            data_pekerjaan: {
                pekerjaan_id: "",
                status_pekerjaan: "",
                nama_perusahaan: "",
                jenis_bisnis: "",
                jabatan: "",
                lama_bekerja: "",
                pekerjaan_sebelumnya: "",
                alamat_kantor: "",
                telp_kantor: "",
                fax_kantor: "",
                agree: "",
            },
            akun_bank: {
                akun_bank_id: "",
                nama_pemilik: "",
                bank_id: "",
                no_rek: "",
                cabang: "",
                no_telp: "",
                jenis_akun_bank: "",
                nama_bank: "",
                file: "",
                agree: "",
            },
            pengalaman_trading: {
                pengalaman_trading_id: "",
                user_id: "",
                tujuan_pembukaan_rekening: "",
                pertanyaan1: "",
                pertanyaan2: "",
                pertanyaan3: "",
                pertanyaan4: "",
                pertanyaan5: "",
                pertanyaan6: "",
                agree: "",
            },
            dokumen: {
                dokumen_pribadi_pernyataan: {
                    data_pribadi_pernyataan_id: "",
                    tanggal: "",
                    agree: "",
                },
                arr_dokumen: {
                    count: {
                        total_data: 0,
                    },
                    data: [
                        // {
                        //     "dokumen_id": "DK2021951633424347985985",
                        //     "tipe": "KTP",
                        //     "file": "http://54.179.230.52/read-file?act=dokumen_pribadi&file=Bank-BR-2021951633424347985985.jpg",
                        //     "size": 129
                        // }
                    ],
                },
            },
            tipe_akun: {
                data_tipe_akun_id: "",
                rate_id: "",
                tipe_akun_id: "",
                nama_rate: "",
                nama_tipe_akun: "",
                deposit: "",
                leverage: "",
                lot_minimum: "",
                lot_maximum: "",
                spread: "",
                komisi: "",
            },
            pernyataan: {
                data_pernyataan_id: null,
                pernyataan1: null,
                pernyataan2: null,
                pernyataan3: null,
                pernyataan4: null,
                tanggal: null,
                pengadilan: null,
                wakil_pialang: null,
                nama_depan: null,
                nama_belakang: null,
                agree: null,
                badan_abritase: null,
            },
            ketentuan_trading: null,
        };
        this.state = {
            user_id: "",
            data_tipe_akun_id: "",
            role_id: "",
            email: "",
            nama_depan: "",
            nama_belakang: "",
            tipe: "",
            status: "",
            leverage: 400,
            informasi_kelengkapan: this.informasiKelengkapan,
            showFormLeverage: false,
            showDataPribadi: true,
            showKekayaan: true,
            showKontakDarurat: true,
            showDataPekerjaan: true,
            showAkunBank: true,
            showPengalamanTrading: true,
            showDokumen: true,
            showTipeAkun: true,
            showPernyataan: true,
            showKetentuanTrading: false,
            dataErr: this.dataErr,
            dataKekayaanErr: this.dataKekayaanErr,
            dataKontakDaruratErr: this.dataKontakDaruratErr,
            dataPekerjaanErr: this.dataPekerjaanErr,
            dataAkunBankErr: this.dataAkunBankErr,
            dataPengalamanTradingErr: this.dataPengalamanTradingErr,
            dokumenErr: this.dokumenErr,

            chk_nama_depan: "",
            chk_nama_belakang: "",
            chk_nama_pasangan: "",
            chk_tempat_lahir: "",
            chk_tanggal_lahir: "",
            chk_no_identitas: "",
            chk_jenis_identitas: "",
            chk_npwp: "",
            chk_jenis_kelamin: "",
            chk_status_pernikahan: "",
            chk_nama_ibu_kandung: "",
            chk_alamat: "",
            chk_rt: "",
            chk_rw: "",
            chk_provinsi: "",
            chk_warga_negara: "",
            chk_telp: "",
            chk_fax: "",
            chk_handphone: "",
            chk_status_kepemilikan: "",
            chk_email: "",

            chk_pendapatan_pertahun: "",
            chk_lokasi: "",
            chk_njop: "",
            chk_deposit_bank: "",
            chk_lainnya: "",

            chk_nama: "",
            chk_alamat_darurat: "",
            chk_kode_pos: "",
            chk_telp_darurat: "",
            chk_handphone_darurat: "",
            chk_hubungan: "",

            chk_status_pekerjaan: "",
            chk_nama_perusahaan: "",
            chk_jenis_bisnis: "",
            chk_jabatan: "",
            chk_lama_bekerja: "",
            chk_pekerjaan_sebelumnya: "",
            chk_alamat_kantor: "",
            chk_telp_kantor: "",
            chk_fax_kantor: "",

            chk_nama_pemilik: "",
            chk_no_rek: "",
            chk_cabang: "",
            chk_no_telp: "",
            chk_jenis_akun_bank: "",
            chk_nama_bank: "",

            chk_tujuan_pembukaan_rekening: "",
            chk_pertanyaan1: "",
            chk_pertanyaan2: "",
            chk_pertanyaan3: "",
            chk_pertanyaan4: "",
            chk_pertanyaan5: "",
            chk_pertanyaan6: "",

            chk_file_dok: "",
        };
    }

    componentDidMount = async () => {
        let isLoading = true;
        const id = sessionStorage.getItem("user_id");
        const data_tipe_akun_id = sessionStorage.getItem("data_tipe_akun_id");
        this.setState({user_id: id});
        await fetchDataDetail(id + "?data_tipe_akun_id=" + data_tipe_akun_id)
            .then((response) => {
                let dataRes = response.data;
                if (dataRes.error_message === 0) {
                    let payload = dataRes.payload;
                    this.setState({
                        user_id: payload.user_id,
                        role_id: payload.role_id,
                        data_tipe_akun_id: payload.informasi_kelengkapan.tipe_akun
                            ? payload.informasi_kelengkapan.tipe_akun.data_tipe_akun_id
                            : "",
                        email: payload.email,
                        nama_depan: payload.nama_depan,
                        nama_belakang: payload.nama_belakang,
                        tipe: payload.tipe,
                        status: payload.status,
                        informasi_kelengkapan: payload.informasi_kelengkapan,
                        filepdf: payload.filepdf,
                    });
                    isLoading = false;
                    fetchDataLoading(isLoading);
                } else {
                    const errorpayload = {};
                    errorpayload["message"] = "Something wrong";
                    errorpayload["status"] = response.data.error_message;
                    fetchDataError(errorpayload);
                    isLoading = false;
                    fetchDataLoading(isLoading);
                    this.props.history.goBack();
                }
            })
            .catch((error) => {
                const errorpayload = {};
                errorpayload["message"] = "Something wrong";
                errorpayload["status"] = error.response ? error.response.status : 404;
                fetchDataError(errorpayload);
                isLoading = false;
                fetchDataLoading(isLoading);
                this.props.history.goBack();
            });
    };

    handleChangeDPP(evt) {
        const name = evt.target.name;
        var value = evt.target.value;
        let nm = name.replace("chk_", "");
        this.setState({
            [name]: value,
        });
        if (
            name === "chk_nama_depan" ||
            name === "chk_nama_belakang" ||
            name === "chk_nama_pasangan" ||
            name === "chk_tempat_lahir" ||
            name === "chk_tanggal_lahir" ||
            name === "chk_no_identitas" ||
            name === "chk_jenis_identitas" ||
            name === "chk_npwp" ||
            name === "chk_jenis_kelamin" ||
            name === "chk_status_pernikahan" ||
            name === "chk_nama_ibu_kandung" ||
            name === "chk_alamat" ||
            name === "chk_rt" ||
            name === "chk_rw" ||
            name === "chk_provinsi" ||
            name === "chk_warga_negara" ||
            name === "chk_telp" ||
            name === "chk_fax" ||
            name === "chk_handphone" ||
            name === "chk_status_kepemilikan" ||
            name === "chk_email"
        ) {
            this.setState({
                dataErr: {
                    data_pribadi: {
                        ...this.state.dataErr.data_pribadi,
                        [nm]: "",
                    },
                },
            });
        }
        if (
            name === "chk_pendapatan_pertahun" ||
            name === "chk_lokasi" ||
            name === "chk_njop" ||
            name === "chk_deposit_bank" ||
            name === "chk_lainnya"
        ) {
            this.setState({
                dataKekayaanErr: {
                    kekayaan: {
                        ...this.state.dataKekayaanErr.kekayaan,
                        [nm]: "",
                    },
                },
            });
        }
        if (
            name === "chk_nama" ||
            name === "chk_alamat_darurat" ||
            name === "chk_kode_pos" ||
            name === "chk_telp_darurat" ||
            name === "chk_handphone_darurat" ||
            name === "chk_hubungan"
        ) {
            this.setState({
                dataKontakDaruratErr: {
                    kontak_darurat: {
                        ...this.state.dataKontakDaruratErr.kontak_darurat,
                        [nm]: "",
                    },
                },
            });
        }
        if (
            name === "chk_status_pekerjaan" ||
            name === "chk_nama_perusahaan" ||
            name === "chk_jenis_bisnis" ||
            name === "chk_jabatan" ||
            name === "chk_lama_bekerja" ||
            name === "chk_pekerjaan_sebelumnya" ||
            name === "chk_alamat_kantor" ||
            name === "chk_telp_kantor" ||
            name === "chk_fax_kantor"
        ) {
            this.setState({
                dataPekerjaanErr: {
                    data_pekerjaan: {
                        ...this.state.dataPekerjaanErr.data_pekerjaan,
                        [nm]: "",
                    },
                },
            });
        }
        if (
            name === "chk_nama_pemilik" ||
            name === "chk_no_rek" ||
            name === "chk_cabang" ||
            name === "chk_no_telp" ||
            name === "chk_jenis_akun_bank" ||
            name === "chk_nama_bank"
        ) {
            this.setState({
                dataAkunBankErr: {
                    akun_bank: {
                        ...this.state.dataAkunBankErr.akun_bank,
                        [nm]: "",
                    },
                },
            });
        }

        if (
            name === "chk_tujuan_pembukaan_rekening" ||
            name === "chk_pertanyaan1" ||
            name === "chk_pertanyaan2" ||
            name === "chk_pertanyaan3" ||
            name === "chk_pertanyaan4" ||
            name === "chk_pertanyaan5" ||
            name === "chk_pertanyaan6"
        ) {
            this.setState({
                dataPengalamanTradingErr: {
                    pengalaman_trading: {
                        ...this.state.dataPengalamanTradingErr.pengalaman_trading,
                        [nm]: "",
                    },
                },
            });
        }
    }

    handleChangeDPP2(evt) {
        const name = evt.target.name;
        var value = evt.target.value;
        let chk_file_dok = 1;
        this.setState({
            [name]: value,
        });
        let nm = name.replace("chk_", "");
        if (value === "Y") {
            chk_file_dok = chk_file_dok > 0 ? chk_file_dok - 1 : chk_file_dok;
            this.setState({
                dokumenErr: {
                    arr_dokumen: {
                        ...this.state.dokumenErr.arr_dokumen,
                        [nm]: "",
                    },
                },
            });
        }

        this.setState({
            ...this.state,
            chk_file_dok: chk_file_dok > 0 ? "N" : "Y",
        });
    }

    handleChange(evt) {
        const name = evt.target.name;
        var value = evt.target.value;
        this.setState({
            dataErr: {
                data_pribadi: {
                    ...this.state.dataErr.data_pribadi,
                    [name]: value,
                },
            },
        });
    }

    handleChangeKekayaan(evt) {
        const name = evt.target.name;
        var value = evt.target.value;
        this.setState({
            dataKekayaanErr: {
                kekayaan: {
                    ...this.state.dataKekayaanErr.kekayaan,
                    [name]: value,
                },
            },
        });
    }

    handleChangeKontakDarurat(evt) {
        const name = evt.target.name;
        var value = evt.target.value;
        this.setState({
            dataKontakDaruratErr: {
                kontak_darurat: {
                    ...this.state.dataKontakDaruratErr.kontak_darurat,
                    [name]: value,
                },
            },
        });
    }

    handleChangePekerjaaan(evt) {
        const name = evt.target.name;
        var value = evt.target.value;
        this.setState({
            dataPekerjaanErr: {
                data_pekerjaan: {
                    ...this.state.dataPekerjaanErr.data_pekerjaan,
                    [name]: value,
                },
            },
        });
    }

    handleChangeAkunBank(evt) {
        const name = evt.target.name;
        var value = evt.target.value;
        this.setState({
            dataAkunBankErr: {
                akun_bank: {
                    ...this.state.dataAkunBankErr.akun_bank,
                    [name]: value,
                },
            },
        });
    }

    handleChangePengalamanTrading(evt) {
        const name = evt.target.name;
        var value = evt.target.value;

        this.setState({
            dataPengalamanTradingErr: {
                pengalaman_trading: {
                    ...this.state.dataPengalamanTradingErr.pengalaman_trading,
                    [name]: value,
                },
            },
        });
    }

    handleChangeDok(evt) {
        const name = evt.target.name;
        var value = evt.target.value;

        this.setState({
            dokumenErr: {
                arr_dokumen: {
                    ...this.state.dokumenErr.arr_dokumen,
                    [name]: value,
                },
            },
        });
    }

    handleReject = async (dt, evt) => {
        let dtt = {};
        let dtk = {};
        let dkd = {};
        let dtp = {};
        let dab = {};
        let dpt = {};
        let ddoc = {};
        Object.keys(this.state.dataErr.data_pribadi).map((key) => {
            if (this.state.dataErr.data_pribadi[key] !== "")
                dtt = {...dtt, [key]: this.state.dataErr.data_pribadi[key]};
            return 1;
        });
        Object.keys(this.state.dataKekayaanErr.kekayaan).map((key) => {
            if (this.state.dataKekayaanErr.kekayaan !== "")
                dtk = {...dtk, [key]: this.state.dataKekayaanErr.kekayaan[key]};
            return 1;
        });
        Object.keys(this.state.dataKontakDaruratErr.kontak_darurat).map((key) => {
            if (this.state.dataKontakDaruratErr.kontak_darurat !== "")
                dtk = {
                    ...dkd,
                    [key]: this.state.dataKontakDaruratErr.kontak_darurat[key],
                };
            return 1;
        });
        Object.keys(this.state.dataPekerjaanErr.data_pekerjaan).map((key) => {
            if (this.state.dataPekerjaanErr.data_pekerjaan !== "")
                dtp = {
                    ...dkd,
                    [key]: this.state.dataPekerjaanErr.data_pekerjaan[key],
                };
            return 1;
        });
        Object.keys(this.state.dataAkunBankErr.akun_bank).map((key) => {
            if (this.state.dataAkunBankErr.akun_bank !== "")
                dab = {...dab, [key]: this.state.dataAkunBankErr.akun_bank[key]};
            return 1;
        });
        Object.keys(this.state.dataPengalamanTradingErr.pengalaman_trading).map(
            (key) => {
                if (this.state.dataPengalamanTradingErr.pengalaman_trading !== "")
                    dpt = {
                        ...dpt,
                        [key]: this.state.dataPengalamanTradingErr.pengalaman_trading[key],
                    };
                return 1;
            }
        );
        Object.keys(this.state.dokumenErr.arr_dokumen).map((key) => {
            if (this.state.dokumenErr.arr_dokumen !== "") {
                var myArray = key.split("_");
                ddoc = {
                    ...ddoc,
                    tipe: myArray[0],
                    dokumen_id: myArray[1],
                    [myArray[0]]: this.state.dokumenErr.arr_dokumen[key],
                };
            }
            return 1;
        });
        let res = {
            data_pribadi: dtt,
            kekayaan: dtk,
            kontak_darurat: dkd,
            data_pekerjaan: dtp,
            akun_bank: dab,
            pengalaman_trading: dpt,
            dokumen: ddoc,
            data_tipe_akun_id: this.state.data_tipe_akun_id
        };

        const queryString = {
            ...res,
        };
        await this.props.onReject(this.state.user_id, queryString);
    };

    handleApprove = async () => {
        await this.props.onApprove(
            this.state.user_id,
            this.state.data_tipe_akun_id,
            this.state.leverage
        );
    };

    handleShowApprove() {
        this.setState({showFormLeverage: true});
    }

    handleCloseSwal() {
        this.setState({
            dataErr: this.dataErr,
            dataAkunBankErr: this.dataAkunBankErr,
            dataKekayaanErr: this.dataKekayaanErr,
            dataKontakDaruratErr: this.dataKontakDaruratErr,
            dataPengalamanTradingErr: this.dataPengalamanTradingErr,
            dataPekerjaanErr: this.dataPekerjaanErr,
            dokumenErr: this.dokumenErr,
            showFormLeverage: false,
        });
        this.props.closeSwal();
        this.props.history.goBack();
    }

    handleClose() {
        this.setState({showFormLeverage: false});
    }

    render() {
        const {
            user_id,
            email,
            nama_belakang,
            nama_depan,
            informasi_kelengkapan,
            status,
        } = this.state;


        const frmUser = (
            <Form id="myForm">
                <Form.Group controlId="leverage">
                    <Form.Label>Leverage</Form.Label>
                    <Form.Control
                        name="leverage"
                        size="sm"
                        value={this.state.leverage ? this.state.leverage : 400}
                        onChange={e => this.setState({leverage: e.target.value})}
                        as="select"
                    >
                        <option value={100}>100</option>
                        <option value={200}>200</option>
                        <option value={300}>300</option>
                        <option value={400}>400</option>
                        <option value={500}>500</option>
                    </Form.Control>
                </Form.Group>

            </Form>
        );
        return (
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Detail User</h1>
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                    </div>
                    {/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                {/* card start */}
                                <div
                                    className="card card-success shadow-lg"
                                    style={{minHeight: "470px"}}
                                >
                                    <div className="card-body">
                                        {this.props.isLoading && <p>Loading ....</p>}
                                        {user_id !== "" && (
                                            <div>
                                                {this.state.showDataPribadi && (
                                                    <>
                                                        <table className="table">
                                                            <tbody>
                                                            <tr>
                                                                <td
                                                                    className="text-center text-bold table-active"
                                                                    colSpan="3"
                                                                >
                                                                    DATA PRIBADI
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold" width="35%">
                                                                    Nama Lengkap
                                                                </td>
                                                                <td className="text-bold" width="1%">
                                                                    :
                                                                </td>
                                                                <td>{nama_depan + " " + nama_belakang}</td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">Nama Pasangan</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi
                                                                            .nama_pasangan
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">Kota Lahir</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi
                                                                            .kota_lahir
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">Tgl.Lahir</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi
                                                                            .tanggal_lahir
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">Nomor Identitas</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi
                                                                            .no_identitas
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">Jenis Identitas</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi
                                                                            .jenis_identitas
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">NPWP</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi.npwp
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">Jenis Kelamin</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi
                                                                            .jenis_kelamin
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">
                                                                    Status Pernikahan
                                                                </td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi
                                                                            .status_pernikahan
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">
                                                                    Nama Ibu Kandung
                                                                </td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi
                                                                            .nama_ibu_kandung
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">Alamat</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi
                                                                            .alamat
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">RT</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi.rt
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">RW</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi.rw
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">Provinsi</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi
                                                                            .provinsi
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">Warga Negara</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi
                                                                            .warga_negara
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">Telpon</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi.telp
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Fax</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi.fax
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">Handphone</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi
                                                                            .handphone
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">
                                                                    Status Kepemilikan
                                                                </td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi
                                                                            .status_kepemilikan
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Email</td>
                                                                <td className="text-bold">:</td>
                                                                <td>{email}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Agree</td>
                                                                <td className="text-bold">:</td>
                                                                <td colSpan={3}>
                                                                    {informasi_kelengkapan.data_pribadi !==
                                                                    null &&
                                                                    informasi_kelengkapan.data_pribadi.agree !==
                                                                    null
                                                                        ? informasi_kelengkapan.data_pribadi
                                                                            .agree === "Y"
                                                                            ? "Yes"
                                                                            : "No"
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </>
                                                )}

                                                {this.state.showKekayaan && (
                                                    <>
                                                        <br/>
                                                        <table className="table">
                                                            <tbody>
                                                            <tr>
                                                                <td
                                                                    className="text-center text-bold table-active"
                                                                    colSpan="3"
                                                                >
                                                                    KEKAYAAN
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold" width="35%">
                                                                    Pendapatan Pertahun
                                                                </td>
                                                                <td className="text-bold" width="1%">
                                                                    :
                                                                </td>
                                                                <td>
                                                                    {informasi_kelengkapan.kekayaan !== null
                                                                        ? informasi_kelengkapan.kekayaan
                                                                            .pendapatan_pertahun
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Lokasi</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.kekayaan !== null
                                                                        ? informasi_kelengkapan.kekayaan.lokasi
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">NJOP</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.kekayaan !== null ? (
                                                                        <NumberFormat
                                                                            value={
                                                                                informasi_kelengkapan.kekayaan.njop
                                                                            }
                                                                            thousandSeparator={true}
                                                                            decimalScale={2}
                                                                            displayType={"text"}
                                                                        />
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Deposit Bank</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.kekayaan !== null ? (
                                                                        <NumberFormat
                                                                            value={
                                                                                informasi_kelengkapan.kekayaan
                                                                                    .deposit_bank
                                                                            }
                                                                            thousandSeparator={true}
                                                                            decimalScale={2}
                                                                            displayType={"text"}
                                                                        />
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Lainnya</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.kekayaan !== null ? (
                                                                        <NumberFormat
                                                                            value={
                                                                                informasi_kelengkapan.kekayaan.lainnya
                                                                            }
                                                                            thousandSeparator={true}
                                                                            decimalScale={2}
                                                                            displayType={"text"}
                                                                        />
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Agree</td>
                                                                <td className="text-bold">:</td>
                                                                <td colSpan={3}>
                                                                    {informasi_kelengkapan.kekayaan !== null &&
                                                                    informasi_kelengkapan.kekayaan.agree !==
                                                                    null
                                                                        ? informasi_kelengkapan.data_pribadi
                                                                            .agree === "Y"
                                                                            ? "Yes"
                                                                            : "No"
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </>
                                                )}

                                                {this.state.showKontakDarurat && (
                                                    <>
                                                        <br/>
                                                        <table className="table">
                                                            <tbody>
                                                            <tr>
                                                                <td
                                                                    className="text-center text-bold table-active"
                                                                    colSpan="3"
                                                                >
                                                                    KONTAK DARURAT
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold" width="35%">
                                                                    Nama
                                                                </td>
                                                                <td className="text-bold" width="1%">
                                                                    :
                                                                </td>
                                                                <td>
                                                                    {informasi_kelengkapan.kontak_darurat !==
                                                                    null
                                                                        ? informasi_kelengkapan.kontak_darurat
                                                                            .nama
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Alamat</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.kontak_darurat !==
                                                                    null
                                                                        ? informasi_kelengkapan.kontak_darurat
                                                                            .alamat
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Kode Pos</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.kontak_darurat !==
                                                                    null
                                                                        ? informasi_kelengkapan.kontak_darurat
                                                                            .kode_pos
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Telpon</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.kontak_darurat !==
                                                                    null
                                                                        ? informasi_kelengkapan.kontak_darurat
                                                                            .telp
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Handphone</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.kontak_darurat !==
                                                                    null
                                                                        ? informasi_kelengkapan.kontak_darurat
                                                                            .handphone
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">Hubungan</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.kontak_darurat !==
                                                                    null
                                                                        ? informasi_kelengkapan.kontak_darurat
                                                                            .hubungan
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Agree</td>
                                                                <td className="text-bold">:</td>
                                                                <td colSpan={3}>
                                                                    {informasi_kelengkapan.kontak_darurat !==
                                                                    null &&
                                                                    informasi_kelengkapan.kontak_darurat
                                                                        .agree !== null
                                                                        ? informasi_kelengkapan.kontak_darurat
                                                                            .agree === "Y"
                                                                            ? "Yes"
                                                                            : "No"
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </>
                                                )}

                                                {this.state.showDataPekerjaan && (
                                                    <>
                                                        <br/>
                                                        <table className="table">
                                                            <tbody>
                                                            <tr>
                                                                <td
                                                                    className="text-center text-bold table-active"
                                                                    colSpan="3"
                                                                >
                                                                    DATA PEKERJAAN
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold" width="35%">
                                                                    Status Pekerjaan
                                                                </td>
                                                                <td className="text-bold" width="1%">
                                                                    :
                                                                </td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pekerjaan !==
                                                                    null
                                                                        ? informasi_kelengkapan.data_pekerjaan
                                                                            .status_pekerjaan
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Nama Perusahaan</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pekerjaan !==
                                                                    null
                                                                        ? informasi_kelengkapan.data_pekerjaan
                                                                            .nama_perusahaan
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Jenis Bisnis</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pekerjaan !==
                                                                    null
                                                                        ? informasi_kelengkapan.data_pekerjaan
                                                                            .jenis_bisnis
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Jabatan</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pekerjaan !==
                                                                    null
                                                                        ? informasi_kelengkapan.data_pekerjaan
                                                                            .jabatan
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Lama Bekerja</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pekerjaan !==
                                                                    null
                                                                        ? informasi_kelengkapan.data_pekerjaan
                                                                            .lama_bekerja
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">
                                                                    Pekerjaan Sebelumnya
                                                                </td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pekerjaan !==
                                                                    null
                                                                        ? informasi_kelengkapan.data_pekerjaan
                                                                            .pekerjaan_sebelumnya
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Alamat Kantor</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pekerjaan !==
                                                                    null
                                                                        ? informasi_kelengkapan.data_pekerjaan
                                                                            .alamat_kantor
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Telpon Kantor</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pekerjaan !==
                                                                    null
                                                                        ? informasi_kelengkapan.data_pekerjaan
                                                                            .telp_kantor
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Fax Kantor</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pekerjaan !==
                                                                    null
                                                                        ? informasi_kelengkapan.data_pekerjaan
                                                                            .fax_kantor
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Agree</td>
                                                                <td className="text-bold">:</td>
                                                                <td colSpan={3}>
                                                                    {informasi_kelengkapan.data_pekerjaan !==
                                                                    null &&
                                                                    informasi_kelengkapan.data_pekerjaan
                                                                        .agree !== null
                                                                        ? informasi_kelengkapan.data_pekerjaan
                                                                            .agree === "Y"
                                                                            ? "Yes"
                                                                            : "No"
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </>
                                                )}

                                                {this.state.showAkunBank && (
                                                    <>
                                                        <br/>
                                                        <table className="table">
                                                            <tbody>
                                                            <tr>
                                                                <td
                                                                    className="text-center text-bold table-active"
                                                                    colSpan="3"
                                                                >
                                                                    AKUN BANK
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold" width="35%">
                                                                    Nama Pemilik
                                                                </td>
                                                                <td className="text-bold" width="1%">
                                                                    :
                                                                </td>
                                                                <td>
                                                                    {informasi_kelengkapan.akun_bank !== null
                                                                        ? informasi_kelengkapan.akun_bank
                                                                            .nama_pemilik
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Nomor Rekening</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.akun_bank !== null
                                                                        ? informasi_kelengkapan.akun_bank.no_rek
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            {/* <tr>
                                  <td className="text-bold">Cabang</td>
                                  <td className="text-bold">:</td>
                                  <td>
                                    {informasi_kelengkapan.akun_bank !== null
                                      ? informasi_kelengkapan.akun_bank.cabang
                                      : ""}
                                  </td>
                                </tr>*/}

                                                            <tr>
                                                                <td className="text-bold">Jenis Akun Bank</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.akun_bank !== null
                                                                        ? informasi_kelengkapan.akun_bank
                                                                            .jenis_akun_bank
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Nama Bank</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.akun_bank !== null
                                                                        ? informasi_kelengkapan.akun_bank
                                                                            .nama_bank
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            {/* <tr>
                                                                    <td className="text-bold">File</td><td className="text-bold">:</td><td><img src={informasi_kelengkapan.akun_bank !== null ? informasi_kelengkapan.akun_bank.file : ""} height={100} alt="" /></td>
                                                                    <td><input type="checkbox" name="chk_file" checked={dataAkunBankErr.akun_bank.chk_file ? true : false} onChange={this.handleChangeAkunBank.bind(this)} /></td>
                                                                    <td>
                                                                        <input type="text" disabled={dataAkunBankErr.akun_bank.chk_file ? false : true}
                                                                            value={dataAkunBankErr.akun_bank.file ? dataAkunBankErr.akun_bank.file : ''} autoComplete="off" onChange={this.handleChangeAkunBank.bind(this)} name="file" />
                                                                    </td>
                                                                </tr> */}
                                                            <tr>
                                                                <td className="text-bold">Agree</td>
                                                                <td className="text-bold">:</td>
                                                                <td colSpan={3}>
                                                                    {informasi_kelengkapan.akun_bank !== null &&
                                                                    informasi_kelengkapan.akun_bank.agree !==
                                                                    null
                                                                        ? informasi_kelengkapan.akun_bank
                                                                            .agree === "Y"
                                                                            ? "Yes"
                                                                            : "No"
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </>
                                                )}

                                                {this.state.showPengalamanTrading && (
                                                    <>
                                                        <br/>
                                                        <table className="table">
                                                            <tbody>
                                                            <tr>
                                                                <td
                                                                    className="text-center text-bold table-active"
                                                                    colSpan="3"
                                                                >
                                                                    PENGALAMAN TRADING
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold" width="16%">
                                                                    Tujuan Pembukaan Rekening
                                                                </td>
                                                                <td className="text-bold" width="1%">
                                                                    :
                                                                </td>
                                                                <td width="28%">
                                                                    {informasi_kelengkapan.pengalaman_trading !==
                                                                    null
                                                                        ? informasi_kelengkapan.pengalaman_trading
                                                                            .tujuan_pembukaan_rekening
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">
                                                                    Pengalaman trading
                                                                </td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.pengalaman_trading !==
                                                                    null
                                                                        ? informasi_kelengkapan.pengalaman_trading
                                                                            .pertanyaan1 === "Y"
                                                                            ? "Yes"
                                                                            : "No"
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">
                                                                    Pengalaman trading sebelum
                                                                </td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.pengalaman_trading
                                                                        ? informasi_kelengkapan.pengalaman_trading
                                                                            .pertanyaan2
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">
                                                                    Keluarga bekerja?
                                                                </td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.pengalaman_trading !==
                                                                    null
                                                                        ? informasi_kelengkapan.pengalaman_trading
                                                                            .pertanyaan3 === "Y"
                                                                            ? "Yes"
                                                                            : "No"
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">
                                                                    Pailit pengadilan
                                                                </td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.pengalaman_trading !==
                                                                    null
                                                                        ? informasi_kelengkapan.pengalaman_trading
                                                                            .pertanyaan4 === "Y"
                                                                            ? "Yes"
                                                                            : "No"
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">
                                                                    Pengalaman perdagangan berjangka
                                                                </td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.pengalaman_trading !==
                                                                    null
                                                                        ? informasi_kelengkapan.pengalaman_trading
                                                                            .pertanyaan5 === "Y"
                                                                            ? "Yes"
                                                                            : "No"
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">
                                                                    Pengalaman trading berjangka sebelum
                                                                </td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.pengalaman_trading
                                                                        ? informasi_kelengkapan.pengalaman_trading
                                                                            .pertanyaan6
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Agree</td>
                                                                <td className="text-bold">:</td>
                                                                <td colSpan={3}>
                                                                    {informasi_kelengkapan.pengalaman_trading !==
                                                                    null &&
                                                                    informasi_kelengkapan.pengalaman_trading
                                                                        .agree !== null
                                                                        ? informasi_kelengkapan.pengalaman_trading
                                                                            .agree === "Y"
                                                                            ? "Yes"
                                                                            : "No"
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </>
                                                )}
                                                {this.state.showDokumen && (
                                                    <>
                                                        <br/>
                                                        <table className="table">
                                                            <tbody>
                                                            <tr>
                                                                <td
                                                                    className="text-center text-bold table-active"
                                                                    colSpan="4"
                                                                >
                                                                    DOKUMEN
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold" width="31%">
                                                                    Tanggal
                                                                </td>
                                                                <td className="text-bold" width="1%">
                                                                    :
                                                                </td>
                                                                <td width="20%">
                                                                    {informasi_kelengkapan.dokumen !== null
                                                                        ? informasi_kelengkapan.dokumen
                                                                            .dokumen_pribadi_pernyataan.tanggal
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Agree</td>
                                                                <td className="text-bold">:</td>
                                                                <td colSpan="3">
                                                                    {informasi_kelengkapan.dokumen !== null
                                                                        ? informasi_kelengkapan.dokumen
                                                                            .dokumen_pribadi_pernyataan.agree ===
                                                                        "Y"
                                                                            ? "Yes"
                                                                            : "No"
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            {informasi_kelengkapan.dokumen !== null &&
                                                                informasi_kelengkapan.dokumen.arr_dokumen
                                                                    .count.total_data !== 0 &&
                                                                informasi_kelengkapan.dokumen.arr_dokumen
                                                                    .count.total_data !== null &&
                                                                informasi_kelengkapan.dokumen.arr_dokumen.data.map(
                                                                    (item, index) => {
                                                                        return (
                                                                            <tr key={item.dokumen_id}>
                                                                                <td className="text-bold">
                                                                                    Tipe
                                                                                    <br/>
                                                                                    Size
                                                                                </td>
                                                                                <td className="text-bold">
                                                                                    {" "}
                                                                                    : <br/> :
                                                                                </td>
                                                                                <td>
                                                                                    {item.tipe === "OTHER"
                                                                                        ? "BUKU TABUNGAN"
                                                                                        : item.tipe}
                                                                                    <br/>
                                                                                    {item.size}
                                                                                </td>
                                                                                <td width="36%">
                                                                                    <img
                                                                                        src={item.file}
                                                                                        height={100}
                                                                                        alt=""
                                                                                    />
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    }
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </>
                                                )}
                                                {this.state.showTipeAkun && (
                                                    <>
                                                        <br/>
                                                        <table className="table">
                                                            <tbody>
                                                            <tr>
                                                                <td
                                                                    className="text-center text-bold table-active"
                                                                    colSpan="3"
                                                                >
                                                                    TIPE AKUN
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold" width="35%">
                                                                    Nama Tipe Akun
                                                                </td>
                                                                <td className="text-bold" width="1%">
                                                                    :
                                                                </td>
                                                                <td>
                                                                    {informasi_kelengkapan.tipe_akun !== null
                                                                        ? informasi_kelengkapan.tipe_akun
                                                                            .nama_tipe_akun
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Nama Rate</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.tipe_akun !== null
                                                                        ? informasi_kelengkapan.tipe_akun
                                                                            .nama_rate
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Deposit</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.tipe_akun !== null
                                                                        ? informasi_kelengkapan.tipe_akun.deposit
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Leverage</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.tipe_akun !== null
                                                                        ? informasi_kelengkapan.tipe_akun.leverage
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Lot Minimum</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.tipe_akun !== null
                                                                        ? informasi_kelengkapan.tipe_akun
                                                                            .lot_minimum
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Lot Maximum</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.tipe_akun !== null
                                                                        ? informasi_kelengkapan.tipe_akun
                                                                            .lot_maximum
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Spread</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.tipe_akun !== null
                                                                        ? informasi_kelengkapan.tipe_akun.spread
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Komisi</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.tipe_akun !== null
                                                                        ? informasi_kelengkapan.tipe_akun.komisi
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </>
                                                )}

                                                {this.state.showPernyataan && (
                                                    <>
                                                        <br/>
                                                        <table className="table">
                                                            <tbody>
                                                            <tr>
                                                                <td
                                                                    className="text-center text-bold table-active"
                                                                    colSpan="3"
                                                                >
                                                                    PERNYATAAN
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">Tanggal</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.pernyataan !== null
                                                                        ? informasi_kelengkapan.pernyataan.tanggal
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Pengadilan</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.pernyataan !== null
                                                                        ? informasi_kelengkapan.pernyataan
                                                                            .pengadilan
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">Nama Depan</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.pernyataan !== null
                                                                        ? informasi_kelengkapan.pernyataan
                                                                            .nama_depan
                                                                        : ""}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">Badan Abritase</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.pernyataan !== null
                                                                        ? informasi_kelengkapan.pernyataan
                                                                            .badan_abritase
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Agree</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.pernyataan !== null
                                                                        ? informasi_kelengkapan.pernyataan
                                                                            .agree === "Y"
                                                                            ? "Yes"
                                                                            : "No"
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            {this.state.filepdf ? (
                                                                <tr>
                                                                    <td className="text-bold">
                                                                        <a
                                                                            href={this.state.filepdf}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            Download pdf
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            ) : (
                                                                ""
                                                            )}
                                                            </tbody>
                                                        </table>
                                                    </>
                                                )}

                                                {this.state.showKetentuanTrading && (
                                                    <>
                                                        <br/>
                                                        <table className="table">
                                                            <tbody>
                                                            <tr>
                                                                <td
                                                                    className="text-center text-bold table-active"
                                                                    colSpan="3"
                                                                >
                                                                    KETENTUAN TRADING
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan="3">
                                                                    {informasi_kelengkapan.pernyataan !== null
                                                                        ? informasi_kelengkapan.pernyataan
                                                                            .pernyataan1
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                        {this.props.showFormSuccess ? (
                                            <AppSwalSuccess
                                                show={this.props.showFormSuccess}
                                                title={this.props.contentMsg}
                                                type={this.props.tipeSWAL}
                                                handleClose={this.handleCloseSwal.bind(this)}
                                            ></AppSwalSuccess>
                                        ) : (
                                            ""
                                        )}
                                        <AppModal
                                            size="sm"
                                            show={this.state.showFormLeverage}
                                            form={frmUser}
                                            backdrop="static"
                                            keyboard={false}
                                            title="Leverage"
                                            titleButton="Approve"
                                            themeButton="success"
                                            handleClose={this.handleClose.bind(this)}
                                            formSubmit={this.handleApprove.bind(this)}
                                        ></AppModal>
                                        <Button
                                            variant="primary"
                                            onClick={() => this.props.history.goBack()}
                                        >
                                            <i className="fa fa-arrow-left"></i> Back
                                        </Button>
                                        &nbsp;
                                        {status === "Menunggu Verifikasi" && (
                                            <Fragment>
                                                <Button
                                                    variant="danger"
                                                    onClick={this.handleReject.bind(this)}
                                                >
                                                    <i className="fa fa-times"></i> Reject
                                                </Button>
                                                &nbsp;
                                                <Button
                                                    variant="success"
                                                    onClick={this.handleShowApprove.bind(this)}
                                                >
                                                    <i className="fa fa-check"></i> Approve
                                                </Button>
                                                &nbsp;
                                            </Fragment>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.dataUser.isLoading,
        isAddLoading: state.dataUser.isAddLoading,
        error: state.dataUser.error || null,
        errorPriority: state.dataUser.errorPriority || null,
        totalData: state.dataUser.totalData || 0,
        showFormAdd: state.dataUser.showFormAdd,
        contentMsg: state.dataUser.contentMsg,
        showFormSuccess: state.dataUser.showFormSuccess,
        showFormDelete: state.dataUser.showFormDelete,
        showFormApprove: state.dataUser.showFormApprove,
        tipeSWAL: state.dataUser.tipeSWAL,
        user: state.auth.currentUser,
    };
};

const mapDispatchToPros = (dispatch) => {
    return {
        // onLoad: (queryString) => {
        //     dispatch(fetchData(queryString));
        // },

        // onDelete: (data) => {
        //     dispatch(deleteData(data));
        // },
        onApprove: (data, data_tipe_akun, leverage) => {
            dispatch(approveData(data, data_tipe_akun, leverage));
        },
        showForm: (data) => {
            dispatch(addForm(data));
        },
        // showConfirmDel: (data) => {
        //     dispatch(showConfirmDel(data));
        // },
        showConfirmApprove: (data) => {
            dispatch(showConfirmApprove(data));
        },
        onReject: (id, data) => {
            dispatch(rejectData(id, data));
        },
        closeSwal: () => {
            const _data = {};
            _data["showFormSuccess"] = false;
            _data["contentMsg"] = null;
            dispatch(addDataSuccess(_data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToPros)(DetailUserListAppr);
