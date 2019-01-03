<template>
    <Popup :visible="visible" @maskTrigger="cancel">
        <van-picker
                ref="vanPicker"
                class="popup-fade-in-up"
                :columns="columns"
                @change="change"
                @cancel="cancel"
                @confirm="confirm"
                show-toolbar
                title>
        </van-picker>
    </Popup>
</template>

<script>
    import wholeCity from '^config/city';

    export default {
        name: "cityPicker",
        props: {
            visible: {
                type: Boolean,
                default: true
            },
            provinceDefault: {
                type: String,
                default: "北京市"
            },
            cityDefault: {
                type: String,
                default: ""
            },
            areaDefault: {
                type: String,
                default: ""
            },
            type: {
                type: Array,
                default: () => ["province", "city", "area"]
            }
        },
        data() {
            const columnsTemp = {
                province: {
                    values: wholeCity['0'],
                    defaultIndex: 0
                },
                city: {
                    values: wholeCity['0_0'],
                    defaultIndex: 0
                },
                area: {
                    values: wholeCity['0_0_0'],
                    defaultIndex: 0
                }
            };
            let columns = [];
            this.type.forEach(item => {
                columns.push(columnsTemp[item]);
            });

            return {
                province: this.provinceDefault,
                city: this.cityDefault,
                area: this.areaDefault,
                address: '',
                columns
            }
        },
        watch: {
            visible(val) {
                if(val) {
                    this.province = this.provinceDefault;
                    this.city = this.cityDefault;
                    this.area = this.areaDefault;
                    this.setData();
                }
            }
        },
        methods: {
            setData() {
                const index = {},
                 list = {};

                list.province = wholeCity['0'];
                index.province = wholeCity['0'].indexOf(this.province);
                list.city = wholeCity['0_' + index.province];
                index.city = list.city.indexOf(this.city || list.city[0]);
                list.area = wholeCity['0_' + index.province + '_' + index.city];
                index.area = list.area.indexOf(this.area || list.area[0]);
                this.type.forEach((item, idx) => {
                    this.$refs.vanPicker.setColumnValues(idx, list[item]);
                    this.$refs.vanPicker.setColumnIndex(idx, index[item]);
                });
            },
            cancel() {
                this.$emit('update:visible', false);
                this.$emit('cancel');
            },
            confirm(values) {
                const temp = {};
                this.type.forEach((item, index) => {
                    if(values[index]) temp[item] = values[index];
                });
                this.$emit('update:visible', false);
                this.$emit('active', temp);
            },
            change(picker, values) {
                if(this.type.length > 1) {
                    let provinceIndex = "0",
                     cityList = void 0;
                    const provinceIndexNum = this.type.indexOf("province");

                    if(provinceIndexNum > -1) {
                        provinceIndex = wholeCity[0].indexOf(values[provinceIndexNum]);
                        cityList = wholeCity['0_' + provinceIndex];
                    }
                    let areaList = void 0;
                    const cityIndexNum = this.type.indexOf("city");
                    if(cityIndexNum > -1) {
                        let cityIndex = cityList.indexOf(values[cityIndexNum]);
                        cityIndex = cityIndex > -1 ? cityIndex : 0;
                        areaList = wholeCity['0_' + provinceIndex + '_' + cityIndex];
                    }

                    picker.setColumnValues(provinceIndexNum + 1, cityList);
                    picker.setColumnValues(cityIndexNum + 1, areaList);
                }
            }
        }
    }
</script>