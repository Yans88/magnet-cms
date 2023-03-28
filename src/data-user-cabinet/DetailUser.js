import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {
    addDataSuccess,
    addForm,
    approveData,
    fetchDataDetail,
    fetchDataError,
    fetchDataLoading,
    reCreatePDF,
    rejectData,
    rejectDataUser,
    reSendPDF,
    showConfirmApprove,
    showConfirmDel
} from "./dataUserService";
import {Button, Figure, Form} from "react-bootstrap";
import {AppSwalSuccess} from "../components/modal/SwalSuccess";
import AppModal from "../components/modal/MyModal";
import NumberFormat from "react-number-format";

class DetailUser extends Component {
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
            role_id: "",
            email: "",
            nama_depan: "",
            nama_belakang: "",
            data_tipe_akun_id: "",
            tipe: "",
            tipe_reg: "",
            status_dokumen: "",
            leverage: 400,
            selected: {file: "", notes: ""},
            showImage: false,
            showFormLeverage: false,
            informasi_kelengkapan: this.informasiKelengkapan,
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
            reSendPDF: false,
            akun_real_user: [],

            chk_nama_depan: "",
            chk_nama_belakang: "",
            chk_nama_pasangan: "",
            chk_kota_lahir: "",
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
            //chk_no_telp: "",
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
                        tipe_reg: payload.informasi_kelengkapan.tipe_akun
                            ? payload.informasi_kelengkapan.tipe_akun.tipe
                            : "",
                        email: payload.email,
                        nama_depan: payload.nama_depan,
                        nama_belakang: payload.nama_belakang,
                        tipe: payload.tipe,
                        status_dokumen: payload.status_dokumen,
                        informasi_kelengkapan: payload.informasi_kelengkapan,
                        filepdf: payload.filepdf,
                        akun_real_user: payload.akun_real_user,
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

    showImg = (record) => {
        this.setState({
            selected: {
                file: record,
                showImage: true,
            },
        });
    };

    reCreatePDF() {
        this.props.onReCreatePDF(`${this.state.user_id}?data_tipe_akun_id=${this.state.data_tipe_akun_id}`);
    }

    reSendPDF() {
        this.setState({reSendPDF: true});
        this.props.onResendPDF(`${this.state.user_id}?data_tipe_akun_id=${this.state.data_tipe_akun_id}`);
    }

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
            name === "chk_kota_lahir" ||
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
        var myArray = name.split("_");
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
        //let ddoc = {};
        Object.keys(this.state.dataErr.data_pribadi).map((key) => {
            if (this.state.dataErr.data_pribadi !== "") {
                if (this.state.dataErr.data_pribadi[key]) dtt = {...dtt, [key]: this.state.dataErr.data_pribadi[key]};
            }
            return 1;
        });
        Object.keys(this.state.dataKekayaanErr.kekayaan).map((key) => {
            if (this.state.dataKekayaanErr.kekayaan !== "") {
                if (this.state.dataKekayaanErr.kekayaan[key]) dtk = {
                    ...dtk,
                    [key]: this.state.dataKekayaanErr.kekayaan[key]
                };
            }
            return 1;
        });
        Object.keys(this.state.dataKontakDaruratErr.kontak_darurat).map((key) => {
            if (this.state.dataKontakDaruratErr.kontak_darurat !== "") {
                if (this.state.dataKontakDaruratErr.kontak_darurat[key])
                    dkd = {
                        ...dkd,
                        [key]: this.state.dataKontakDaruratErr.kontak_darurat[key]
                    };
            }
            return 1;
        });
        Object.keys(this.state.dataPekerjaanErr.data_pekerjaan).map((key) => {
            if (this.state.dataPekerjaanErr.data_pekerjaan !== "") {
                if (this.state.dataPekerjaanErr.data_pekerjaan[key])
                    dtp = {
                        ...dtp,
                        [key]: this.state.dataPekerjaanErr.data_pekerjaan[key]
                    };
            }
            return 1;
        });
        Object.keys(this.state.dataAkunBankErr.akun_bank).map((key) => {
            if (this.state.dataAkunBankErr.akun_bank !== "") {
                if (this.state.dataAkunBankErr.akun_bank[key]) dab = {
                    ...dab,
                    [key]: this.state.dataAkunBankErr.akun_bank[key]
                };
            }
            return 1;
        });
        Object.keys(this.state.dataPengalamanTradingErr.pengalaman_trading).map(
            (key) => {
                if (this.state.dataPengalamanTradingErr.pengalaman_trading !== "") {
                    if (this.state.dataPengalamanTradingErr.pengalaman_trading[key])
                        dpt = {
                            ...dpt,
                            [key]: this.state.dataPengalamanTradingErr.pengalaman_trading[key]
                        };
                }
                return 1;
            }
        );
        /* Object.keys(this.state.dokumenErr.arr_dokumen).map((key) => {
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
         });*/
        let res = {
            data_pribadi: dtt,
            kekayaan: dtk,
            kontak_darurat: dkd,
            data_pekerjaan: dtp,
            akun_bank: dab,
            pengalaman_trading: dpt,
            //dokumen: ddoc,
        };

        const queryString = {
            ...res,
        };
        await this.props.onReject(
            this.state.user_id + "?data_tipe_akun_id=" + this.state.data_tipe_akun_id,
            queryString
        );
    };

    handleNoteReject = async () => {
        this.props.showConfirmDel(true);
    };

    handleRejectUser = async () => {

        await this.props.onRejectUser(this.state.user_id, this.state.selected.notes + '&data_tipe_akun_id=' + this.state.data_tipe_akun_id);
    };

    handleApprove = async () => {

        await this.props.onApprove(
            this.state.user_id,
            this.state.data_tipe_akun_id,
            this.state.leverage
        );
    };

    handleCloseSwal() {
        this.setState({
            dataErr: this.dataErr,
            dataAkunBankErr: this.dataAkunBankErr,
            dataKekayaanErr: this.dataKekayaanErr,
            dataKontakDaruratErr: this.dataKontakDaruratErr,
            dataPengalamanTradingErr: this.dataPengalamanTradingErr,
            dataPekerjaanErr: this.dataPekerjaanErr,
            dokumenErr: this.dokumenErr,
            selected: {
                showImage: false,
            },
        });
        this.props.closeSwal();
        this.props.showConfirmDel(false);
        if (!this.state.reSendPDF) window.location.reload();
        this.setState({reSendPDF: false});
        // this.props.history.goBack();
    }

    handleShowApprove() {
        this.setState({showFormLeverage: true});
    }

    handleClose() {
        this.setState({showFormLeverage: false});
    }

    handleChangeNote(event) {
        const {name, value} = event.target;
        var val = value;
        this.setState({
            loadingForm: false,
            errMsg: {...this.state.errMsg, [name]: ""},
            selected: {
                ...this.state.selected,
                [name]: val,
            },
        });
    }

    render() {

        const {
            user_id,
            email,
            nama_belakang,
            nama_depan,
            informasi_kelengkapan,
            status_dokumen,
            dataErr,
            dataKekayaanErr,
            dataKontakDaruratErr,
            dataPekerjaanErr,
            dataAkunBankErr,
            dataPengalamanTradingErr,
            dokumenErr,

            chk_nama_depan,
            chk_nama_belakang,
            chk_nama_pasangan,
            chk_kota_lahir,
            chk_tanggal_lahir,
            chk_no_identitas,
            chk_jenis_identitas,
            chk_npwp,
            chk_jenis_kelamin,
            chk_status_pernikahan,
            chk_nama_ibu_kandung,
            chk_alamat,
            chk_rt,
            chk_rw,
            chk_provinsi,
            chk_warga_negara,
            chk_telp,
            chk_fax,
            chk_handphone,
            chk_status_kepemilikan,
            chk_email,

            chk_pendapatan_pertahun,
            chk_lokasi,
            chk_njop,
            chk_deposit_bank,
            chk_lainnya,

            chk_nama,
            chk_alamat_darurat,
            chk_kode_pos,
            chk_telp_darurat,
            chk_handphone_darurat,
            chk_hubungan,

            chk_status_pekerjaan,
            chk_nama_perusahaan,
            chk_jenis_bisnis,
            chk_jabatan,
            chk_lama_bekerja,
            chk_pekerjaan_sebelumnya,
            chk_alamat_kantor,
            chk_telp_kantor,
            chk_fax_kantor,

            chk_nama_pemilik,
            chk_no_rek,
            chk_cabang,
            //chk_no_telp,
            chk_jenis_akun_bank,
            chk_nama_bank,

            chk_tujuan_pembukaan_rekening,
            chk_pertanyaan1,
            chk_pertanyaan2,
            chk_pertanyaan3,
            chk_pertanyaan4,
            chk_pertanyaan5,
            chk_pertanyaan6,

            chk_file_dok,
            selected,
            akun_real_user
        } = this.state;
        const frmUser = (
            <Form id="myForm2">
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
        const contentDelete = (
            <Form id="myForm">
                <div id="caption">Keterangan Reject Akun</div>
                <Form.Group controlId="note">
                    <Form.Control
                        rows={5}
                        name="notes"
                        size="sm"
                        autoComplete="off"
                        as="textarea"
                        value={selected.notes ? selected.notes : ""}
                        onChange={this.handleChangeNote.bind(this)}
                        placeholder="Keterangan . . ."
                    />
                </Form.Group>
            </Form>
        );

        const showImg = (
            <Figure style={{marginTop: ".3rem", marginBottom: 0}}>
                <Figure.Image
                    width={450}
                    height={400}
                    src={selected.file ? selected.file : ""}
                />
            </Figure>
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
                                                <table className="table">
                                                    <tbody>
                                                    <tr>
                                                        <td
                                                            className="text-center text-bold table-active"
                                                            colSpan="3">
                                                            Akun Real
                                                        </td>
                                                    </tr>
                                                    {akun_real_user.length > 0 && akun_real_user.map(ar =>
                                                        <tr key={ar.login}>
                                                            <td
                                                                className="text-bold"
                                                                width="35%">
                                                                Login
                                                            </td>
                                                            <td className="text-bold" width="1%">
                                                                :
                                                            </td>
                                                            <td>{ar.login}</td>
                                                        </tr>)}
                                                    </tbody>
                                                </table>
                                                {this.state.showDataPribadi && (
                                                    <>
                                                        <table className="table">
                                                            <tbody>
                                                            <tr>
                                                                <td
                                                                    className="text-center text-bold table-active"
                                                                    colSpan={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "5"
                                                                            : "3"
                                                                    }
                                                                >
                                                                    DATA PRIBADI
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    className="text-bold"
                                                                    width={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "5%"
                                                                            : "35%"
                                                                    }
                                                                >
                                                                    Nama Lengkap
                                                                </td>
                                                                <td className="text-bold" width="1%">
                                                                    :
                                                                </td>
                                                                <td
                                                                    width={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "53%"
                                                                            : ""
                                                                    }
                                                                >
                                                                    {nama_depan + " " + nama_belakang}
                                                                </td>
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_nama_depan"
                                                                                id="chk_nama_depan_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_nama_depan_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_nama_depan"
                                                                                id="chk_nama_depan_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_nama_depan_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_nama_depan === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_nama_depan === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi.nama_depan
                                                                                        ? dataErr.data_pribadi.nama_depan
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                                name="nama_depan"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_nama_pasangan"
                                                                                id="chk_nama_pasangan_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_nama_pasangan_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_nama_pasangan"
                                                                                id="chk_nama_pasangan_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_nama_pasangan_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_nama_pasangan === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_nama_pasangan === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi.nama_pasangan
                                                                                        ? dataErr.data_pribadi
                                                                                            .nama_pasangan
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="nama_pasangan"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_kota_lahir"
                                                                                id="chk_kota_lahir_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_kota_lahir_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_kota_lahir"
                                                                                id="chk_kota_lahir_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_kota_lahir_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_kota_lahir === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_kota_lahir === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi.kota_lahir
                                                                                        ? dataErr.data_pribadi.kota_lahir
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="kota_lahir"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_tanggal_lahir"
                                                                                id="chk_tanggal_lahir_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_tanggal_lahir_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_tanggal_lahir"
                                                                                id="chk_tanggal_lahir_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_tanggal_lahir_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_tanggal_lahir === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_tanggal_lahir === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi.tanggal_lahir
                                                                                        ? dataErr.data_pribadi
                                                                                            .tanggal_lahir
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="tanggal_lahir"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_no_identitas"
                                                                                id="chk_no_identitas_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_no_identitas_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_no_identitas"
                                                                                id="chk_no_identitas_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_no_identitas_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_no_identitas === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_no_identitas === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi.no_identitas
                                                                                        ? dataErr.data_pribadi
                                                                                            .no_identitas
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="no_identitas"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">Jenis Identitas</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !==
                                                                    null ? (
                                                                        <Fragment>
                                                                            {
                                                                                informasi_kelengkapan.data_pribadi
                                                                                    .jenis_identitas
                                                                            }
                                                                            &nbsp;&nbsp;&nbsp;
                                                                            {informasi_kelengkapan.dokumen
                                                                                    .arr_dokumen.count.total_data !==
                                                                                null &&
                                                                                informasi_kelengkapan.dokumen.arr_dokumen.data.map(
                                                                                    (item, index) => {
                                                                                        return (
                                                                                            item.tipe === "KTP" && (
                                                                                                <img
                                                                                                    onClick={(e) =>
                                                                                                        this.showImg(item.file)
                                                                                                    }
                                                                                                    key={
                                                                                                        "imt_ktp_" +
                                                                                                        item.dokumen_id
                                                                                                    }
                                                                                                    src={item.file}
                                                                                                    height={100}
                                                                                                    alt=""
                                                                                                />
                                                                                            )
                                                                                        );
                                                                                    }
                                                                                )}
                                                                        </Fragment>
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </td>
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_jenis_identitas"
                                                                                id="chk_jenis_identitas_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_jenis_identitas_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>
                                                                            &nbsp;&nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_jenis_identitas"
                                                                                id="chk_jenis_identitas_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_jenis_identitas_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_jenis_identitas === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_jenis_identitas === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi.jenis_identitas
                                                                                        ? dataErr.data_pribadi
                                                                                            .jenis_identitas
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="jenis_identitas"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">NPWP</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi.npwp
                                                                        : ""}
                                                                </td>
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_npwp"
                                                                                id="chk_npwp_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_npwp_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_npwp"
                                                                                id="chk_npwp_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_npwp_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_npwp === "N" ? "input-no" : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_npwp === "N" ? false : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi.npwp
                                                                                        ? dataErr.data_pribadi.npwp
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="npwp"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_jenis_kelamin"
                                                                                id="chk_jenis_kelamin_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_jenis_kelamin_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_jenis_kelamin"
                                                                                id="chk_jenis_kelamin_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_jenis_kelamin_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_jenis_kelamin === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_jenis_kelamin === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi.jenis_kelamin
                                                                                        ? dataErr.data_pribadi
                                                                                            .jenis_kelamin
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="jenis_kelamin"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_status_pernikahan"
                                                                                id="chk_status_pernikahan_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_status_pernikahan_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_status_pernikahan"
                                                                                id="chk_status_pernikahan_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_status_pernikahan_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_status_pernikahan === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_status_pernikahan === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi
                                                                                        .status_pernikahan
                                                                                        ? dataErr.data_pribadi
                                                                                            .status_pernikahan
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="status_pernikahan"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_nama_ibu_kandung"
                                                                                id="chk_nama_ibu_kandung_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_nama_ibu_kandung_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_nama_ibu_kandung"
                                                                                id="chk_nama_ibu_kandung_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_nama_ibu_kandung_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_nama_ibu_kandung === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_nama_ibu_kandung === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi
                                                                                        .nama_ibu_kandung
                                                                                        ? dataErr.data_pribadi
                                                                                            .nama_ibu_kandung
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="nama_ibu_kandung"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_alamat"
                                                                                id="chk_alamat_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_alamat_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_alamat"
                                                                                id="chk_alamat_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_alamat_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_alamat === "N" ? "input-no" : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_alamat === "N" ? false : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi.alamat
                                                                                        ? dataErr.data_pribadi.alamat
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="alamat"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">RT</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi.rt
                                                                        : ""}
                                                                </td>
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_rt"
                                                                                id="chk_rt_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_rt_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_rt"
                                                                                id="chk_rt_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_rt_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_rt === "N" ? "input-no" : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_rt === "N" ? false : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi.rt
                                                                                        ? dataErr.data_pribadi.rt
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="rt"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">RW</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi.rw
                                                                        : ""}
                                                                </td>
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_rw"
                                                                                id="chk_rw_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_rw_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_rw"
                                                                                id="chk_rw_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_rw_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_rw === "N" ? "input-no" : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_rw === "N" ? false : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi.rw
                                                                                        ? dataErr.data_pribadi.rw
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="rw"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_provinsi"
                                                                                id="chk_provinsi_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_provinsi_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_provinsi"
                                                                                id="chk_provinsi_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_provinsi_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_provinsi === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_provinsi === "N" ? false : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi.provinsi
                                                                                        ? dataErr.data_pribadi.provinsi
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="provinsi"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_warga_negara"
                                                                                id="chk_warga_negara_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_warga_negara_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_warga_negara"
                                                                                id="chk_warga_negara_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_warga_negara_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_warga_negara === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_warga_negara === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi.warga_negara
                                                                                        ? dataErr.data_pribadi
                                                                                            .warga_negara
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="warga_negara"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">Telepon</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi.telp
                                                                        : ""}
                                                                </td>
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_telp"
                                                                                id="chk_telp_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_telp_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_telp"
                                                                                id="chk_telp_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_telp_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_telp === "N" ? "input-no" : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_telp === "N" ? false : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi.telp
                                                                                        ? dataErr.data_pribadi.telp
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="telp"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Fax</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pribadi !== null
                                                                        ? informasi_kelengkapan.data_pribadi.fax
                                                                        : ""}
                                                                </td>
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_fax"
                                                                                id="chk_fax_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_fax_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_fax"
                                                                                id="chk_fax_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_fax_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_fax === "N" ? "input-no" : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_fax === "N" ? false : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi.fax
                                                                                        ? dataErr.data_pribadi.fax
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="fax"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_handphone"
                                                                                id="chk_handphone_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_handphone_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_handphone"
                                                                                id="chk_handphone_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_handphone_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_handphone === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_handphone === "N" ? false : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi.handphone
                                                                                        ? dataErr.data_pribadi.handphone
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="handphone"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_status_kepemilikan"
                                                                                id="chk_status_kepemilikan_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_status_kepemilikan_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_status_kepemilikan"
                                                                                id="chk_status_kepemilikan_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_status_kepemilikan_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_status_kepemilikan === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_status_kepemilikan === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi
                                                                                        .status_kepemilikan
                                                                                        ? dataErr.data_pribadi
                                                                                            .status_kepemilikan
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="status_kepemilikan"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Email</td>
                                                                <td className="text-bold">:</td>
                                                                <td>{email}</td>
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_email"
                                                                                id="chk_email_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_email_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_email"
                                                                                id="chk_email_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_email_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>

                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_email === "N" ? "input-no" : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_email === "N" ? false : true
                                                                                }
                                                                                value={
                                                                                    dataErr.data_pribadi.email
                                                                                        ? dataErr.data_pribadi.email
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="email"
                                                                                onChange={this.handleChange.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Agree</td>
                                                                <td className="text-bold">:</td>
                                                                <td
                                                                    colSpan={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? 3
                                                                            : ""
                                                                    }
                                                                >
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
                                                                    colSpan={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "5"
                                                                            : "3"
                                                                    }
                                                                >
                                                                    KEKAYAAN
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    className="text-bold"
                                                                    width={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "5%"
                                                                            : "35%"
                                                                    }
                                                                >
                                                                    Pendapatan Pertahun
                                                                </td>
                                                                <td className="text-bold" width="1%">
                                                                    :
                                                                </td>
                                                                <td
                                                                    width={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "53%"
                                                                            : ""
                                                                    }
                                                                >
                                                                    {informasi_kelengkapan.kekayaan !== null
                                                                        ? informasi_kelengkapan.kekayaan
                                                                            .pendapatan_pertahun
                                                                        : ""}
                                                                </td>
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_pendapatan_pertahun"
                                                                                id="chk_pendapatan_pertahun_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_pendapatan_pertahun_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_pendapatan_pertahun"
                                                                                id="chk_pendapatan_pertahun_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_pendapatan_pertahun_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_pendapatan_pertahun === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_pendapatan_pertahun === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataKekayaanErr.kekayaan
                                                                                        .pendapatan_pertahun
                                                                                        ? dataKekayaanErr.kekayaan
                                                                                            .pendapatan_pertahun
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangeKekayaan.bind(
                                                                                    this
                                                                                )}
                                                                                name="pendapatan_pertahun"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Lokasi</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.kekayaan !== null
                                                                        ? informasi_kelengkapan.kekayaan.lokasi
                                                                        : ""}
                                                                </td>
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_lokasi"
                                                                                id="chk_lokasi_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_lokasi_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_lokasi"
                                                                                id="chk_lokasi_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_lokasi_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_lokasi === "N" ? "input-no" : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_lokasi === "N" ? false : true
                                                                                }
                                                                                value={
                                                                                    dataKekayaanErr.kekayaan.lokasi
                                                                                        ? dataKekayaanErr.kekayaan.lokasi
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangeKekayaan.bind(
                                                                                    this
                                                                                )}
                                                                                name="lokasi"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_njop"
                                                                                id="chk_njop_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_njop_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_njop"
                                                                                id="chk_njop_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_njop_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_njop === "N" ? "input-no" : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_njop === "N" ? false : true
                                                                                }
                                                                                value={
                                                                                    dataKekayaanErr.kekayaan.njop
                                                                                        ? dataKekayaanErr.kekayaan.njop
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangeKekayaan.bind(
                                                                                    this
                                                                                )}
                                                                                name="njop"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_deposit_bank"
                                                                                id="chk_deposit_bank_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_deposit_bank_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_deposit_bank"
                                                                                id="chk_deposit_bank_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_deposit_bank_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_deposit_bank === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_deposit_bank === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataKekayaanErr.kekayaan
                                                                                        .deposit_bank
                                                                                        ? dataKekayaanErr.kekayaan
                                                                                            .deposit_bank
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangeKekayaan.bind(
                                                                                    this
                                                                                )}
                                                                                name="deposit_bank"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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

                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_lainnya"
                                                                                id="chk_lainnya_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_lainnya_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_lainnya"
                                                                                id="chk_lainnya_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_lainnya_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_lainnya === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_lainnya === "N" ? false : true
                                                                                }
                                                                                value={
                                                                                    dataKekayaanErr.kekayaan.lainnya
                                                                                        ? dataKekayaanErr.kekayaan.lainnya
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangeKekayaan.bind(
                                                                                    this
                                                                                )}
                                                                                name="lainnya"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Agree</td>
                                                                <td className="text-bold">:</td>
                                                                <td
                                                                    colSpan={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? 3
                                                                            : ""
                                                                    }
                                                                >
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
                                                                    colSpan={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "5"
                                                                            : "3"
                                                                    }
                                                                >
                                                                    KONTAK DARURAT
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    className="text-bold"
                                                                    width={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "5%"
                                                                            : "35%"
                                                                    }
                                                                >
                                                                    Nama
                                                                </td>
                                                                <td className="text-bold" width="1%">
                                                                    :
                                                                </td>
                                                                <td
                                                                    width={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "53%"
                                                                            : ""
                                                                    }
                                                                >
                                                                    {informasi_kelengkapan.kontak_darurat !==
                                                                    null
                                                                        ? informasi_kelengkapan.kontak_darurat
                                                                            .nama
                                                                        : ""}
                                                                </td>
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_nama"
                                                                                id="chk_nama_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_nama_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_nama"
                                                                                id="chk_nama_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_nama_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_nama === "N" ? "input-no" : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_nama === "N" ? false : true
                                                                                }
                                                                                value={
                                                                                    dataKontakDaruratErr.kontak_darurat
                                                                                        .nama
                                                                                        ? dataKontakDaruratErr
                                                                                            .kontak_darurat.nama
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangeKontakDarurat.bind(
                                                                                    this
                                                                                )}
                                                                                name="nama"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_alamat_darurat"
                                                                                id="chk_alamat_darurat_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_alamat_darurat_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_alamat_darurat"
                                                                                id="chk_alamat_darurat_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_alamat_darurat_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_alamat_darurat === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_alamat_darurat === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataKontakDaruratErr.kontak_darurat
                                                                                        .alamat_darurat
                                                                                        ? dataKontakDaruratErr
                                                                                            .kontak_darurat.alamat_darurat
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangeKontakDarurat.bind(
                                                                                    this
                                                                                )}
                                                                                name="alamat_darurat"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_kode_pos"
                                                                                id="chk_kode_pos_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_kode_pos_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_kode_pos"
                                                                                id="chk_kode_pos_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_kode_pos_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_kode_pos === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_kode_pos === "N" ? false : true
                                                                                }
                                                                                value={
                                                                                    dataKontakDaruratErr.kontak_darurat
                                                                                        .kode_pos
                                                                                        ? dataKontakDaruratErr
                                                                                            .kontak_darurat.kode_pos
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangeKontakDarurat.bind(
                                                                                    this
                                                                                )}
                                                                                name="kode_pos"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Telepon</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.kontak_darurat !==
                                                                    null
                                                                        ? informasi_kelengkapan.kontak_darurat
                                                                            .telp
                                                                        : ""}
                                                                </td>
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_telp_darurat"
                                                                                id="chk_telp_darurat_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_telp_darurat_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_telp_darurat"
                                                                                id="chk_telp_darurat_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_telp_darurat_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_telp_darurat === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_telp_darurat === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataKontakDaruratErr.kontak_darurat
                                                                                        .telp_darurat
                                                                                        ? dataKontakDaruratErr
                                                                                            .kontak_darurat.telp_darurat
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangeKontakDarurat.bind(
                                                                                    this
                                                                                )}
                                                                                name="telp_darurat"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_handphone_darurat"
                                                                                id="chk_handphone_darurat_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_handphone_darurat_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_handphone_darurat"
                                                                                id="chk_handphone_darurat_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_handphone_darurat_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_handphone_darurat === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_handphone_darurat === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataKontakDaruratErr.kontak_darurat
                                                                                        .handphone_darurat
                                                                                        ? dataKontakDaruratErr
                                                                                            .kontak_darurat
                                                                                            .handphone_darurat
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangeKontakDarurat.bind(
                                                                                    this
                                                                                )}
                                                                                name="handphone_darurat"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_hubungan"
                                                                                id="chk_hubungan_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_hubungan_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_hubungan"
                                                                                id="chk_hubungan_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_hubungan_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_hubungan === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_hubungan === "N" ? false : true
                                                                                }
                                                                                value={
                                                                                    dataKontakDaruratErr.kontak_darurat
                                                                                        .hubungan
                                                                                        ? dataKontakDaruratErr
                                                                                            .kontak_darurat.hubungan
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangeKontakDarurat.bind(
                                                                                    this
                                                                                )}
                                                                                name="hubungan"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Agree</td>
                                                                <td className="text-bold">:</td>
                                                                <td
                                                                    colSpan={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? 3
                                                                            : ""
                                                                    }
                                                                >
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
                                                                    colSpan={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "5"
                                                                            : "3"
                                                                    }
                                                                >
                                                                    DATA PEKERJAAN
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    className="text-bold"
                                                                    width={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "5%"
                                                                            : "35%"
                                                                    }
                                                                >
                                                                    Status Pekerjaan
                                                                </td>
                                                                <td className="text-bold" width="1%">
                                                                    :
                                                                </td>
                                                                <td
                                                                    width={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "53%"
                                                                            : ""
                                                                    }
                                                                >
                                                                    {informasi_kelengkapan.data_pekerjaan !==
                                                                    null
                                                                        ? informasi_kelengkapan.data_pekerjaan
                                                                            .status_pekerjaan
                                                                        : ""}
                                                                </td>
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_status_pekerjaan"
                                                                                id="chk_status_pekerjaan_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_status_pekerjaan_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_status_pekerjaan"
                                                                                id="chk_status_pekerjaan_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_status_pekerjaan_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_status_pekerjaan === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_status_pekerjaan === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataPekerjaanErr.data_pekerjaan
                                                                                        .status_pekerjaan
                                                                                        ? dataPekerjaanErr.data_pekerjaan
                                                                                            .status_pekerjaan
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangePekerjaaan.bind(
                                                                                    this
                                                                                )}
                                                                                name="status_pekerjaan"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_nama_perusahaan"
                                                                                id="chk_nama_perusahaan_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_nama_perusahaan_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_nama_perusahaan"
                                                                                id="chk_nama_perusahaan_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_nama_perusahaan_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_nama_perusahaan === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_nama_perusahaan === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataPekerjaanErr.data_pekerjaan
                                                                                        .nama_perusahaan
                                                                                        ? dataPekerjaanErr.data_pekerjaan
                                                                                            .nama_perusahaan
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangePekerjaaan.bind(
                                                                                    this
                                                                                )}
                                                                                name="nama_perusahaan"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_jenis_bisnis"
                                                                                id="chk_jenis_bisnis_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_jenis_bisnis_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_jenis_bisnis"
                                                                                id="chk_jenis_bisnis_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_jenis_bisnis_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_jenis_bisnis === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_jenis_bisnis === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataPekerjaanErr.data_pekerjaan
                                                                                        .jenis_bisnis
                                                                                        ? dataPekerjaanErr.data_pekerjaan
                                                                                            .jenis_bisnis
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangePekerjaaan.bind(
                                                                                    this
                                                                                )}
                                                                                name="jenis_bisnis"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_jabatan"
                                                                                id="chk_jabatan_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_jabatan_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_jabatan"
                                                                                id="chk_jabatan_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_jabatan_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_jabatan === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_jabatan === "N" ? false : true
                                                                                }
                                                                                value={
                                                                                    dataPekerjaanErr.data_pekerjaan
                                                                                        .jabatan
                                                                                        ? dataPekerjaanErr.data_pekerjaan
                                                                                            .jabatan
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangePekerjaaan.bind(
                                                                                    this
                                                                                )}
                                                                                name="jabatan"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_lama_bekerja"
                                                                                id="chk_lama_bekerja_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_lama_bekerja_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_lama_bekerja"
                                                                                id="chk_lama_bekerja_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_lama_bekerja_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_lama_bekerja === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_lama_bekerja === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataPekerjaanErr.data_pekerjaan
                                                                                        .lama_bekerja
                                                                                        ? dataPekerjaanErr.data_pekerjaan
                                                                                            .lama_bekerja
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangePekerjaaan.bind(
                                                                                    this
                                                                                )}
                                                                                name="lama_bekerja"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_pekerjaan_sebelumnya"
                                                                                id="chk_pekerjaan_sebelumnya_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_pekerjaan_sebelumnya_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_pekerjaan_sebelumnya"
                                                                                id="chk_pekerjaan_sebelumnya_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_pekerjaan_sebelumnya_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_pekerjaan_sebelumnya === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_pekerjaan_sebelumnya === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataPekerjaanErr.data_pekerjaan
                                                                                        .pekerjaan_sebelumnya
                                                                                        ? dataPekerjaanErr.data_pekerjaan
                                                                                            .pekerjaan_sebelumnya
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangePekerjaaan.bind(
                                                                                    this
                                                                                )}
                                                                                name="pekerjaan_sebelumnya"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_alamat_kantor"
                                                                                id="chk_alamat_kantor_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_alamat_kantor_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_alamat_kantor"
                                                                                id="chk_alamat_kantor_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_alamat_kantor_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_alamat_kantor === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_alamat_kantor === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataPekerjaanErr.data_pekerjaan
                                                                                        .alamat_kantor
                                                                                        ? dataPekerjaanErr.data_pekerjaan
                                                                                            .alamat_kantor
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangePekerjaaan.bind(
                                                                                    this
                                                                                )}
                                                                                name="alamat_kantor"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Telepon Kantor</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.data_pekerjaan !==
                                                                    null
                                                                        ? informasi_kelengkapan.data_pekerjaan
                                                                            .telp_kantor
                                                                        : ""}
                                                                </td>
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_telp_kantor"
                                                                                id="chk_telp_kantor_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_telp_kantor_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_telp_kantor"
                                                                                id="chk_telp_kantor_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_telp_kantor_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_telp_kantor === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_telp_kantor === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataPekerjaanErr.data_pekerjaan
                                                                                        .telp_kantor
                                                                                        ? dataPekerjaanErr.data_pekerjaan
                                                                                            .telp_kantor
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangePekerjaaan.bind(
                                                                                    this
                                                                                )}
                                                                                name="telp_kantor"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_fax_kantor"
                                                                                id="chk_fax_kantor_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_fax_kantor_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_fax_kantor"
                                                                                id="chk_fax_kantor_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_fax_kantor_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_fax_kantor === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_fax_kantor === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataPekerjaanErr.data_pekerjaan
                                                                                        .fax_kantor
                                                                                        ? dataPekerjaanErr.data_pekerjaan
                                                                                            .fax_kantor
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangePekerjaaan.bind(
                                                                                    this
                                                                                )}
                                                                                name="fax_kantor"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                    colSpan={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "5"
                                                                            : "3"
                                                                    }
                                                                >
                                                                    AKUN BANK
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    className="text-bold"
                                                                    width={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "15%"
                                                                            : "27%"
                                                                    }
                                                                >
                                                                    Nama Pemilik
                                                                </td>
                                                                <td className="text-bold" width="1%">
                                                                    :
                                                                </td>
                                                                <td width="48%">
                                                                    {informasi_kelengkapan.akun_bank !== null
                                                                        ? informasi_kelengkapan.akun_bank
                                                                            .nama_pemilik
                                                                        : ""}
                                                                </td>
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_nama_pemilik"
                                                                                id="chk_nama_pemilik_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_nama_pemilik_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_nama_pemilik"
                                                                                id="chk_nama_pemilik_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_nama_pemilik_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_nama_pemilik === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_nama_pemilik === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataAkunBankErr.akun_bank
                                                                                        .nama_pemilik
                                                                                        ? dataAkunBankErr.akun_bank
                                                                                            .nama_pemilik
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangeAkunBank.bind(
                                                                                    this
                                                                                )}
                                                                                name="nama_pemilik"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Nomor Rekening</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.akun_bank !== null
                                                                        ? informasi_kelengkapan.akun_bank.no_rek
                                                                        : ""}
                                                                </td>
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_no_rek"
                                                                                id="chk_no_rek_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_no_rek_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_no_rek"
                                                                                id="chk_no_rek_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_no_rek_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_no_rek === "N" ? "input-no" : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_no_rek === "N" ? false : true
                                                                                }
                                                                                value={
                                                                                    dataAkunBankErr.akun_bank.no_rek
                                                                                        ? dataAkunBankErr.akun_bank.no_rek
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangeAkunBank.bind(
                                                                                    this
                                                                                )}
                                                                                name="no_rek"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
                                                            </tr>

                                                            <tr>
                                                                <td className="text-bold">Jenis Akun Bank</td>
                                                                <td className="text-bold">:</td>
                                                                <td>
                                                                    {informasi_kelengkapan.akun_bank !== null
                                                                        ? informasi_kelengkapan.akun_bank
                                                                            .jenis_akun_bank
                                                                        : ""}
                                                                </td>
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_jenis_akun_bank"
                                                                                id="chk_jenis_akun_bank_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_jenis_akun_bank_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_jenis_akun_bank"
                                                                                id="chk_jenis_akun_bank_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_jenis_akun_bank_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_jenis_akun_bank === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_jenis_akun_bank === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataAkunBankErr.akun_bank
                                                                                        .jenis_akun_bank
                                                                                        ? dataAkunBankErr.akun_bank
                                                                                            .jenis_akun_bank
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangeAkunBank.bind(
                                                                                    this
                                                                                )}
                                                                                name="jenis_akun_bank"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_nama_bank"
                                                                                id="chk_nama_bank_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_nama_bank_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_nama_bank"
                                                                                id="chk_nama_bank_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_nama_bank_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_nama_bank === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_nama_bank === "N" ? false : true
                                                                                }
                                                                                value={
                                                                                    dataAkunBankErr.akun_bank.nama_bank
                                                                                        ? dataAkunBankErr.akun_bank
                                                                                            .nama_bank
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangeAkunBank.bind(
                                                                                    this
                                                                                )}
                                                                                name="nama_bank"
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
                                                            </tr>

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
                                                                    colSpan={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "5"
                                                                            : "3"
                                                                    }
                                                                >
                                                                    PENGALAMAN TRADING
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold" width="35%">
                                                                    Tujuan Pembukaan Rekening
                                                                </td>
                                                                <td className="text-bold" width="1%">
                                                                    :
                                                                </td>
                                                                <td
                                                                    width={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "28%"
                                                                            : ""
                                                                    }
                                                                >
                                                                    {informasi_kelengkapan.pengalaman_trading !==
                                                                    null
                                                                        ? informasi_kelengkapan.pengalaman_trading
                                                                            .tujuan_pembukaan_rekening
                                                                        : ""}
                                                                </td>
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_tujuan_pembukaan_rekening"
                                                                                id="chk_tujuan_pembukaan_rekening_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_tujuan_pembukaan_rekening_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_tujuan_pembukaan_rekening"
                                                                                id="chk_tujuan_pembukaan_rekening_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_tujuan_pembukaan_rekening_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_tujuan_pembukaan_rekening ===
                                                                                    "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_tujuan_pembukaan_rekening ===
                                                                                    "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataPengalamanTradingErr
                                                                                        .pengalaman_trading
                                                                                        .tujuan_pembukaan_rekening
                                                                                        ? dataPengalamanTradingErr
                                                                                            .pengalaman_trading
                                                                                            .tujuan_pembukaan_rekening
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="tujuan_pembukaan_rekening"
                                                                                onChange={this.handleChangePengalamanTrading.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_pertanyaan1"
                                                                                id="chk_pertanyaan1_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_pertanyaan1_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_pertanyaan1"
                                                                                id="chk_pertanyaan1_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_pertanyaan1_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_pertanyaan1 === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_pertanyaan1 === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataPengalamanTradingErr
                                                                                        .pengalaman_trading.pertanyaan1
                                                                                        ? dataPengalamanTradingErr
                                                                                            .pengalaman_trading
                                                                                            .pertanyaan1
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="pertanyaan1"
                                                                                onChange={this.handleChangePengalamanTrading.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_pertanyaan2"
                                                                                id="chk_pertanyaan2_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_pertanyaan2_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_pertanyaan2"
                                                                                id="chk_pertanyaan2_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_pertanyaan2_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_pertanyaan2 === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_pertanyaan2 === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataPengalamanTradingErr
                                                                                        .pengalaman_trading.pertanyaan2
                                                                                        ? dataPengalamanTradingErr
                                                                                            .pengalaman_trading
                                                                                            .pertanyaan2
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="pertanyaan2"
                                                                                onChange={this.handleChangePengalamanTrading.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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

                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_pertanyaan3"
                                                                                id="chk_pertanyaan3_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_pertanyaan3_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_pertanyaan3"
                                                                                id="chk_pertanyaan3_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_pertanyaan3_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_pertanyaan3 === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_pertanyaan3 === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataPengalamanTradingErr
                                                                                        .pengalaman_trading.pertanyaan3
                                                                                        ? dataPengalamanTradingErr
                                                                                            .pengalaman_trading
                                                                                            .pertanyaan3
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="pertanyaan3"
                                                                                onChange={this.handleChangePengalamanTrading.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_pertanyaan4"
                                                                                id="chk_pertanyaan4_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_pertanyaan4_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_pertanyaan4"
                                                                                id="chk_pertanyaan4_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_pertanyaan4_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_pertanyaan4 === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_pertanyaan4 === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataPengalamanTradingErr
                                                                                        .pengalaman_trading.pertanyaan4
                                                                                        ? dataPengalamanTradingErr
                                                                                            .pengalaman_trading
                                                                                            .pertanyaan4
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="pertanyaan4"
                                                                                onChange={this.handleChangePengalamanTrading.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_pertanyaan5"
                                                                                id="chk_pertanyaan5_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_pertanyaan5_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_pertanyaan5"
                                                                                id="chk_pertanyaan5_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_pertanyaan5_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_pertanyaan5 === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_pertanyaan5 === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataPengalamanTradingErr
                                                                                        .pengalaman_trading.pertanyaan5
                                                                                        ? dataPengalamanTradingErr
                                                                                            .pengalaman_trading
                                                                                            .pertanyaan5
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="pertanyaan5"
                                                                                onChange={this.handleChangePengalamanTrading.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                {status_dokumen === "Menunggu Verifikasi" && (
                                                                    <Fragment>
                                                                        <td>
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_pertanyaan6"
                                                                                id="chk_pertanyaan6_y"
                                                                                value="Y"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_pertanyaan6_y"
                                                                            >
                                                                                Yes{" "}
                                                                            </label>{" "}
                                                                            &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                            <input
                                                                                type="radio"
                                                                                name="chk_pertanyaan6"
                                                                                id="chk_pertanyaan6_n"
                                                                                value="N"
                                                                                onChange={this.handleChangeDPP.bind(
                                                                                    this
                                                                                )}
                                                                            />{" "}
                                                                            <label
                                                                                style={{fontWeight: "bold"}}
                                                                                htmlFor="chk_pertanyaan6_n"
                                                                            >
                                                                                No{" "}
                                                                            </label>
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    chk_pertanyaan6 === "N"
                                                                                        ? "input-no"
                                                                                        : ""
                                                                                }
                                                                                disabled={
                                                                                    chk_pertanyaan6 === "N"
                                                                                        ? false
                                                                                        : true
                                                                                }
                                                                                value={
                                                                                    dataPengalamanTradingErr
                                                                                        .pengalaman_trading.pertanyaan6
                                                                                        ? dataPengalamanTradingErr
                                                                                            .pengalaman_trading
                                                                                            .pertanyaan6
                                                                                        : ""
                                                                                }
                                                                                autoComplete="off"
                                                                                name="pertanyaan6"
                                                                                onChange={this.handleChangePengalamanTrading.bind(
                                                                                    this
                                                                                )}
                                                                            />
                                                                        </td>
                                                                    </Fragment>
                                                                )}
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
                                                                    colSpan={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "6"
                                                                            : "4"
                                                                    }
                                                                >
                                                                    DOKUMEN
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    className="text-bold"
                                                                    width={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "5%"
                                                                            : "35%"
                                                                    }
                                                                >
                                                                    Tanggal
                                                                </td>
                                                                <td className="text-bold" width="1%">
                                                                    :
                                                                </td>
                                                                <td
                                                                    width={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "20%"
                                                                            : ""
                                                                    }
                                                                >
                                                                    {informasi_kelengkapan.dokumen !== null
                                                                        ? informasi_kelengkapan.dokumen
                                                                            .dokumen_pribadi_pernyataan.tanggal
                                                                        : ""}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-bold">Agree</td>
                                                                <td className="text-bold">:</td>
                                                                <td
                                                                    colSpan={
                                                                        status_dokumen === "Menunggu Verifikasi"
                                                                            ? "4"
                                                                            : "3"
                                                                    }
                                                                >
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
                                                                        let nm_dok = "";
                                                                        nm_dok =
                                                                            "chk_" +
                                                                            item.tipe +
                                                                            "_" +
                                                                            item.dokumen_id;
                                                                        let _nm = nm_dok.replace("chk_", "");
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
                                                                                <td colSpan="3"
                                                                                    width={
                                                                                        status_dokumen ===
                                                                                        "Menunggu Verifikasi"
                                                                                            ? "36%"
                                                                                            : ""
                                                                                    }
                                                                                >
                                                                                    <img
                                                                                        onClick={(e) =>
                                                                                            this.showImg(item.file)
                                                                                        }
                                                                                        src={item.file}
                                                                                        height={100}
                                                                                        alt=""
                                                                                    />
                                                                                </td>
                                                                                {status_dokumen ===
                                                                                    "Menunggu Verifikasi12" && (
                                                                                        <Fragment>
                                                                                            <td>
                                                                                                <input
                                                                                                    type="radio"
                                                                                                    name={nm_dok}
                                                                                                    id={
                                                                                                        "chk_" +
                                                                                                        item.tipe +
                                                                                                        "_" +
                                                                                                        item.dokumen_id +
                                                                                                        "_y"
                                                                                                    }
                                                                                                    value="Y"
                                                                                                    onChange={this.handleChangeDPP2.bind(
                                                                                                        this
                                                                                                    )}
                                                                                                />{" "}
                                                                                                <label
                                                                                                    style={{fontWeight: "bold"}}
                                                                                                    htmlFor={
                                                                                                        "chk_" +
                                                                                                        item.tipe +
                                                                                                        "_" +
                                                                                                        item.dokumen_id +
                                                                                                        "_y"
                                                                                                    }
                                                                                                >
                                                                                                    Yes{" "}
                                                                                                </label>{" "}
                                                                                                &nbsp;&nbsp; || &nbsp;&nbsp;
                                                                                                <input
                                                                                                    type="radio"
                                                                                                    name={nm_dok}
                                                                                                    id={
                                                                                                        "chk_" +
                                                                                                        item.tipe +
                                                                                                        "_" +
                                                                                                        item.dokumen_id +
                                                                                                        "_n"
                                                                                                    }
                                                                                                    value="N"
                                                                                                    onChange={this.handleChangeDPP2.bind(
                                                                                                        this
                                                                                                    )}
                                                                                                />{" "}
                                                                                                <label
                                                                                                    style={{fontWeight: "bold"}}
                                                                                                    htmlFor={
                                                                                                        "chk_" +
                                                                                                        item.tipe +
                                                                                                        "_" +
                                                                                                        item.dokumen_id +
                                                                                                        "_n"
                                                                                                    }
                                                                                                >
                                                                                                    No{" "}
                                                                                                </label>
                                                                                            </td>
                                                                                            <td>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className={
                                                                                                        this.state[nm_dok] === "N"
                                                                                                            ? "input-no"
                                                                                                            : ""
                                                                                                    }
                                                                                                    disabled={
                                                                                                        this.state[nm_dok] === "N"
                                                                                                            ? false
                                                                                                            : true
                                                                                                    }
                                                                                                    value={
                                                                                                        dokumenErr.arr_dokumen[_nm]
                                                                                                            ? dokumenErr.arr_dokumen[
                                                                                                                _nm
                                                                                                                ]
                                                                                                            : ""
                                                                                                    }
                                                                                                    autoComplete="off"
                                                                                                    name={
                                                                                                        item.tipe +
                                                                                                        "_" +
                                                                                                        item.dokumen_id
                                                                                                    }
                                                                                                    onChange={this.handleChangeDok.bind(
                                                                                                        this
                                                                                                    )}
                                                                                                />
                                                                                            </td>
                                                                                        </Fragment>
                                                                                    )}
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
                                                                    <td></td>
                                                                    <td></td>
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
                                        <Button
                                            variant="primary"
                                            onClick={() => this.props.history.goBack()}
                                        >
                                            <i className="fa fa-arrow-left"></i> Back
                                        </Button>
                                        &nbsp;
                                        {status_dokumen === "Approve" && (
                                            <Fragment>
                                                <Button variant="warning" onClick={this.reCreatePDF.bind(this)}>
                                                    <i className="fa fa-file-pdf"></i> Recreate PDF
                                                </Button>
                                                &nbsp;
                                                <Button variant="info" onClick={this.reSendPDF.bind(this)}>
                                                    <i className="fa fa-file-pdf"></i> Resend PDF
                                                </Button>
                                                &nbsp;
                                            </Fragment>
                                        )}

                                        {status_dokumen === "Menunggu Verifikasi" && (
                                            <Fragment>
                                                <Button
                                                    disabled={
                                                        chk_nama_depan === "N" ||
                                                        chk_nama_pasangan === "N" ||
                                                        chk_kota_lahir === "N" ||
                                                        chk_tanggal_lahir === "N" ||
                                                        chk_no_identitas === "N" ||
                                                        chk_jenis_identitas === "N" ||
                                                        chk_npwp === "N" ||
                                                        chk_jenis_kelamin === "N" ||
                                                        chk_status_pernikahan === "N" ||
                                                        chk_nama_ibu_kandung === "N" ||
                                                        chk_alamat === "N" ||
                                                        chk_rt === "N" ||
                                                        chk_rw === "N" ||
                                                        chk_provinsi === "N" ||
                                                        chk_warga_negara === "N" ||
                                                        chk_telp === "N" ||
                                                        chk_fax === "N" ||
                                                        chk_handphone === "N" ||
                                                        chk_status_kepemilikan === "N" ||
                                                        chk_email === "N" ||
                                                        chk_pendapatan_pertahun === "N" ||
                                                        chk_lokasi === "N" ||
                                                        chk_njop === "N" ||
                                                        chk_deposit_bank === "N" ||
                                                        chk_lainnya === "N" ||
                                                        chk_nama === "N" ||
                                                        chk_alamat_darurat === "N" ||
                                                        chk_kode_pos === "N" ||
                                                        chk_telp_darurat === "N" ||
                                                        chk_handphone_darurat === "N" ||
                                                        chk_hubungan === "N" ||
                                                        chk_status_pekerjaan === "N" ||
                                                        chk_nama_perusahaan === "N" ||
                                                        chk_jenis_bisnis === "N" ||
                                                        chk_jabatan === "N" ||
                                                        chk_lama_bekerja === "N" ||
                                                        chk_pekerjaan_sebelumnya === "N" ||
                                                        chk_alamat_kantor === "N" ||
                                                        chk_telp_kantor === "N" ||
                                                        chk_fax_kantor === "N" ||
                                                        chk_nama_pemilik === "N" ||
                                                        chk_no_rek === "N" ||
                                                        chk_jenis_akun_bank === "N" ||
                                                        chk_nama_bank === "N" ||
                                                        chk_tujuan_pembukaan_rekening === "N" ||
                                                        chk_pertanyaan1 === "N" ||
                                                        chk_pertanyaan2 === "N" ||
                                                        chk_pertanyaan3 === "N" ||
                                                        chk_pertanyaan4 === "N" ||
                                                        chk_pertanyaan5 === "N" ||
                                                        chk_pertanyaan6 === "N"
                                                            ? false
                                                            : true
                                                    }
                                                    variant="danger"
                                                    onClick={this.handleReject.bind(this)}
                                                >
                                                    <i className="fa fa-times"></i> Send Back
                                                </Button>
                                                &nbsp;
                                                <Button
                                                    disabled={
                                                        chk_nama_depan === "Y" &&
                                                        chk_nama_pasangan === "Y" &&
                                                        chk_kota_lahir === "Y" &&
                                                        chk_tanggal_lahir === "Y" &&
                                                        chk_no_identitas === "Y" &&
                                                        chk_jenis_identitas === "Y" &&
                                                        chk_npwp === "Y" &&
                                                        chk_jenis_kelamin === "Y" &&
                                                        chk_status_pernikahan === "Y" &&
                                                        chk_nama_ibu_kandung === "Y" &&
                                                        chk_alamat === "Y" &&
                                                        chk_rt === "Y" &&
                                                        chk_rw === "Y" &&
                                                        chk_provinsi === "Y" &&
                                                        chk_warga_negara === "Y" &&
                                                        chk_telp === "Y" &&
                                                        chk_fax === "Y" &&
                                                        chk_handphone === "Y" &&
                                                        chk_status_kepemilikan === "Y" &&
                                                        chk_email === "Y" &&
                                                        chk_pendapatan_pertahun === "Y" &&
                                                        chk_lokasi === "Y" &&
                                                        chk_njop === "Y" &&
                                                        chk_deposit_bank === "Y" &&
                                                        chk_lainnya === "Y" &&
                                                        chk_nama === "Y" &&
                                                        chk_alamat_darurat === "Y" &&
                                                        chk_kode_pos === "Y" &&
                                                        chk_telp_darurat === "Y" &&
                                                        chk_handphone_darurat === "Y" &&
                                                        chk_hubungan === "Y" &&
                                                        chk_status_pekerjaan === "Y" &&
                                                        chk_nama_perusahaan === "Y" &&
                                                        chk_jenis_bisnis === "Y" &&
                                                        chk_jabatan === "Y" &&
                                                        chk_lama_bekerja === "Y" &&
                                                        chk_pekerjaan_sebelumnya === "Y" &&
                                                        chk_alamat_kantor === "Y" &&
                                                        chk_telp_kantor === "Y" &&
                                                        chk_fax_kantor === "Y" &&
                                                        chk_nama_pemilik === "Y" &&
                                                        chk_no_rek === "Y" &&
                                                        chk_jenis_akun_bank === "Y" &&
                                                        chk_nama_bank === "Y" &&
                                                        chk_tujuan_pembukaan_rekening === "Y" &&
                                                        chk_pertanyaan1 === "Y" &&
                                                        chk_pertanyaan2 === "Y" &&
                                                        chk_pertanyaan3 === "Y" &&
                                                        chk_pertanyaan4 === "Y" &&
                                                        chk_pertanyaan5 === "Y" &&
                                                        chk_pertanyaan6 === "Y"
                                                            ? false
                                                            : true
                                                    }
                                                    variant="success"
                                                    onClick={this.handleShowApprove.bind(this)}
                                                >
                                                    <i className="fa fa-check"></i> Approve
                                                </Button>
                                                &nbsp;
                                                <Button
                                                    variant="danger"
                                                    onClick={this.handleNoteReject.bind(this)}
                                                >
                                                    <i className="fa fa-times"></i> Reject
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

                <AppModal
                    show={selected.showImage}
                    form={showImg}
                    handleClose={this.handleCloseSwal.bind(this)}
                    keyboard={false}
                    title="View Photo"
                    isLoading={this.props.isAddLoading}
                    formSubmit=""
                    modalFooter="none"
                ></AppModal>
                <AppModal
                    show={this.props.showFormDelete}
                    size="sm"
                    form={contentDelete}
                    handleClose={this.handleCloseSwal.bind(this)}
                    backdrop="static"
                    keyboard={false}
                    title="Confirm"
                    titleButton="Reject"
                    themeButton="danger"
                    isLoading={this.props.isAddLoading}
                    formSubmit={this.handleRejectUser.bind(this)}
                ></AppModal>
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

        onRejectUser: (data, notes) => {
            dispatch(rejectDataUser(data, notes));
        },
        onApprove: (data, data_tipe_akun, leverage) => {
            dispatch(approveData(data, data_tipe_akun, leverage));
        },
        showForm: (data) => {
            dispatch(addForm(data));
        },
        showConfirmDel: (data) => {
            dispatch(showConfirmDel(data));
        },
        showConfirmApprove: (data) => {
            dispatch(showConfirmApprove(data));
        },
        onReject: (id, data) => {
            dispatch(rejectData(id, data));
        },
        onReCreatePDF: (id) => {
            dispatch(reCreatePDF(id))
        },
        onResendPDF: (id) => {
            dispatch(reSendPDF(id))
        },
        closeSwal: () => {
            const _data = {};
            _data["showFormSuccess"] = false;
            _data["contentMsg"] = null;
            dispatch(addDataSuccess(_data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToPros)(DetailUser);
