import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    Field, Form, Formik,
} from 'formik';
import * as yup from "yup";
import * as _ from "lodash";
import classNames from "classnames";
import {app as appActions} from "../store/actions";
import Types from "../classes/types";

import "./app-body.scss";

const {maxPeople} = Types;

const AppBody = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appActions.setCities());
    }, [dispatch]);

    useEffect(() => {
        data.length !== 0 && console.log(JSON.stringify(data))
    })

    const cities = useSelector((state) => _.get(state, 'app.cities', false));
    const data = useSelector((state) => _.get(state, 'app.data', []))
    const lastDate = useSelector((state) => _.get(state, 'app.lastDate', ''))

    const [isChecked, setChecked] = useState(false);

    const validationsSchema = yup.object().shape({
        cityValue: yup.string().typeError('Значение должно быть строкой').required('*'),
        password: yup.string().typeError('string').required('Укажите пароль'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пороли не совпадают').required('Укажите пароль'),
        email: yup.string().email('Введите верный email').required('Укажите E-mail'),
    });

    let maxIndex = cities.reduce((acc, curr, i) => cities[acc].b > curr.b ? acc : i, 0);

    const onSubmit = (values) => {
        isChecked && dispatch(appActions.setData(values,));
    }
    return (
        <div className="AppBody">
            <Formik
                initialValues={{
                    cityValue: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                }}
                validationSchema={validationsSchema}
                onSubmit={onSubmit}
            >
                {({touched, errors,}) => (
                    <Form>
                        <div className="AppBody__form-wrapper">
                            <div className="label">Ваш город</div>

                            <div className="field-wrapper">
                                <div className="field-container">
                                    <Field
                                        className="input select-city"
                                        as="select"
                                        name="cityValue"
                                    >
                                        {maxIndex > 0 && (<option name="cityValue"> {cities[maxIndex].city}</option>)}

                                        {cities.sort((a, b) => a.city.localeCompare(b.city))
                                            .map(({city, population}) =>
                                                population >= maxPeople && (
                                                    <option
                                                        key={city}
                                                        name="cityValue"
                                                    >
                                                        {city}
                                                    </option>
                                                ))}
                                    </Field>
                                    <div className="notification"/>
                                </div>
                            </div>
                        </div>

                        <hr className="AppBody__line"/>

                        <div className="AppBody__form-wrapper password">
                            <label className="label">Пароль</label>
                            <div className="field-wrapper">
                                <div className="field-container">
                                    <Field
                                        className={classNames("input", {red: touched.password && errors.password})}
                                        type="password"
                                        name="password"
                                    />
                                    <div className="notification">
                                        Ваш новый пороль должен содержать не менее 5 символов
                                    </div>
                                </div>
                                {touched.password && (<div className="red-notification">{touched.password}</div>)}
                                {errors.password && (<div className="red-notification">{errors.password}</div>)}
                            </div>
                        </div>

                        <div className="AppBody__form-wrapper repeat-password">
                            <label className="label">Пароль еще раз</label>
                            <div className="field-wrapper">
                                <div className="field-container">
                                    <Field
                                        className={classNames("input", {red: touched.password && errors.password})}
                                        type="password"
                                        name="confirmPassword"
                                    />
                                    <div className="notification">
                                        Повторите пароль, пожалуйста, это обезопасит вас с нами
                                        на случай ошибки.
                                    </div>
                                </div>
                                {touched.confirmPassword && (
                                    <div className="red-notification">{touched.confirmPassword}</div>)}
                                {errors.confirmPassword && (
                                    <div className="red-notification">{errors.confirmPassword}</div>)}
                            </div>
                        </div>

                        <hr className="AppBody__line"/>

                        <div className="AppBody__form-wrapper">
                            <label className="label">Электронная почта</label>
                            <div className="field-wrapper">
                                <div className="field-container">
                                    <Field
                                        className={classNames("input", {red: touched.password && errors.password})}
                                        type="email"
                                        name="email"
                                    />
                                    <div className="notification">
                                        Можно изменить адрес, указанный при регистрации.
                                    </div>
                                </div>
                                {touched.email && (<div className="red-notification">{touched.email}</div>)}
                                {errors.email && (<div className="red-notification">{errors.email}</div>)}
                            </div>
                        </div>

                        <div className="AppBody__form-wrapper">
                            <label className="label">Я согласен</label>
                            <div className="field-wrapper">
                                <div className="field-container checkbox-wrapper" onClick={() => setChecked(!isChecked)}>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={isChecked}
                                        onChange={() => setChecked(!isChecked)}
                                    />

                                    <div className="checkbox-inform">
                                        принимать актуальную информацию на емейл
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="AppBody__form-wrapper">
                            <div className="label"/>
                            <div className="btn-wrapper">
                                <button
                                    className="btn-submit"
                                    type="submit"
                                >
                                    Изменить
                                </button>

                                <div className="notification">
                                    последние изменения {lastDate}
                                </div>
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AppBody;