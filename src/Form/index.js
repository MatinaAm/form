import React, { useState } from 'react';
import { Button, Flex, Form, Input, InputNumber, Modal, Select, Typography } from 'antd';
import strings from "../utils/localization";
import {
  aaa,
  formattedNum, headerSection,
  moneyDetailSection,
} from "../utils/helper";
import TextArea from "antd/lib/input/TextArea";
import { LoadingOutlined, SettingOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ModalForm = () => {
  const [open, setOpen] = useState(false);
  const dropDownRef = React.useRef(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      destination: '',
      amount: '',
      description: ''
    },
  })


  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {

    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      reset()
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    toast.success(`${strings.submitPayment}`)
    handleOk()
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        {strings.withdrawForm}
      </Button>
      <Modal
        title={headerSection(strings.withdrawing, strings.flag)}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button onClick={handleCancel}>
            {strings.cancel}

          </Button>,
          <Button key="submit"
           type="primary" onClick={handleSubmit(onSubmit)}>
            {confirmLoading ? <LoadingOutlined /> :strings.withdrawRequest}
          </Button>,

        ]}
      >
        <Form>

          {moneyDetailSection("موجودی فعلی", formattedNum(15000))}

          <div style={{ marginTop: '10px' }}>

            <Flex gap="20px" align="start" vertical>

              <div style={{ width: '100%' }}>
                <p>
                  <span className={"redColor"}>*</span>
                  {strings.withdrawDestination}</p>

                <Controller
                  name="destination"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}

                  render={({ field: { onChange, onBlur, value } }) => (
                    <Select
                      style={{
                        width: '100%',
                      }}
                      value={value}
                      placeholder={strings.accountPlaceHolder}
                      onChange={onChange}
                      status={errors.destination ? "error" : null}
                      options={[
                        { value: 1, label: " کیف پول اصلی" },
                        { value: 2, label: "کیف پول پرد اختیاری" },
                        { value: 3, label: "کیف پول تسویه" },
                      ]}

                    />
                  )}
                />


              </div>

              <div style={{ width: '100%' }}>
                <p><span className={"redColor"}>*</span>{strings.withdrawAmount}</p>


                <Controller
                  name="amount"
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputNumber
                      status={errors.amount ? "error" : null}
                      placeholder="ریال"
                      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      onChange={onChange}
                      value={value}
                    />

                  )}/>

              </div>

              <div style={{ width: '100%' }}>
                <p>{strings.description}</p>


                <Controller
                  name="description"
                  defaultValue=""
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextArea allowClear
                              onChange={onChange} value={value}

                    />
                  )}/>
              </div>
            </Flex>
          </div>
        </Form>

      </Modal>
    </>
  );
};

export default ModalForm;