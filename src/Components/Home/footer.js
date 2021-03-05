import React from 'react'
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';

var instagram = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTEuOTg0IDE2LjgxNWMyLjU5NiAwIDQuNzA2LTIuMTExIDQuNzA2LTQuNzA3IDAtMS40MDktLjYyMy0yLjY3NC0xLjYwNi0zLjUzOC0uMzQ2LS4zMDMtLjczNS0uNTU2LTEuMTU4LS43NDgtLjU5My0uMjctMS4yNDktLjQyMS0xLjk0MS0uNDIxcy0xLjM0OS4xNTEtMS45NDEuNDIxYy0uNDI0LjE5NC0uODE0LjQ0Ny0xLjE1OC43NDktLjk4NS44NjQtMS42MDggMi4xMjktMS42MDggMy41MzggMCAyLjU5NSAyLjExMiA0LjcwNiA0LjcwNiA0LjcwNnptLjAxNi04LjE4NGMxLjkyMSAwIDMuNDc5IDEuNTU3IDMuNDc5IDMuNDc4IDAgMS45MjEtMS41NTggMy40NzktMy40NzkgMy40NzlzLTMuNDc5LTEuNTU3LTMuNDc5LTMuNDc5YzAtMS45MjEgMS41NTgtMy40NzggMy40NzktMy40Nzh6bTUuMjIzLjM2OWg2Ljc3N3YxMC4yNzhjMCAyLjYwOC0yLjExNCA0LjcyMi00LjcyMiA0LjcyMmgtMTQuNDkzYy0yLjYwOCAwLTQuNzg1LTIuMTE0LTQuNzg1LTQuNzIydi0xMC4yNzhoNi43NDdjLS41NDQuOTEzLS44NzIgMS45NjktLjg3MiAzLjEwOSAwIDMuMzc0IDIuNzM1IDYuMTA5IDYuMTA5IDYuMTA5czYuMTA5LTIuNzM1IDYuMTA5LTYuMTA5Yy4wMDEtMS4xNC0uMzI3LTIuMTk2LS44Ny0zLjEwOXptMi4wNTUtOWgtMTIuMjc4djVoLTF2LTVoLTF2NWgtMXYtNC45MjNjLS4zNDYuMDU3LS42ODIuMTQzLTEgLjI3djQuNjUzaC0xdi00LjEwMmMtMS4yMDIuODU3LTIgMi4yNDYtMiAzLjgyNHYzLjI3OGg3LjQ3M2MxLjE2Ny0xLjI4MiAyLjc5OC0yIDQuNTExLTIgMS43MjIgMCAzLjM1MS43MjUgNC41MTEgMmg3LjUwNXYtMy4yNzhjMC0yLjYwOC0yLjExNC00LjcyMi00LjcyMi00LjcyMnptMi43MjIgNS4yNjVjMCAuNDA2LS4zMzMuNzM1LS43NDUuNzM1aC0yLjUxMWMtLjQxMSAwLS43NDQtLjMyOS0uNzQ0LS43MzV2LTIuNTNjMC0uNDA2LjMzMy0uNzM1Ljc0NC0uNzM1aDIuNTExYy40MTIgMCAuNzQ1LjMyOS43NDUuNzM1djIuNTN6Ii8+PC9zdmc+";
var facebook = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgMGgtMTRjLTIuNzYxIDAtNSAyLjIzOS01IDV2MTRjMCAyLjc2MSAyLjIzOSA1IDUgNWgxNGMyLjc2MiAwIDUtMi4yMzkgNS01di0xNGMwLTIuNzYxLTIuMjM4LTUtNS01em0tMyA3aC0xLjkyNGMtLjYxNSAwLTEuMDc2LjI1Mi0xLjA3Ni44ODl2MS4xMTFoM2wtLjIzOCAzaC0yLjc2MnY4aC0zdi04aC0ydi0zaDJ2LTEuOTIzYzAtMi4wMjIgMS4wNjQtMy4wNzcgMy40NjEtMy4wNzdoMi41Mzl2M3oiLz48L3N2Zz4=";
var whatsapp = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNLjA1NyAyNGwxLjY4Ny02LjE2M2MtMS4wNDEtMS44MDQtMS41ODgtMy44NDktMS41ODctNS45NDYuMDAzLTYuNTU2IDUuMzM4LTExLjg5MSAxMS44OTMtMTEuODkxIDMuMTgxLjAwMSA2LjE2NyAxLjI0IDguNDEzIDMuNDg4IDIuMjQ1IDIuMjQ4IDMuNDgxIDUuMjM2IDMuNDggOC40MTQtLjAwMyA2LjU1Ny01LjMzOCAxMS44OTItMTEuODkzIDExLjg5Mi0xLjk5LS4wMDEtMy45NTEtLjUtNS42ODgtMS40NDhsLTYuMzA1IDEuNjU0em02LjU5Ny0zLjgwN2MxLjY3Ni45OTUgMy4yNzYgMS41OTEgNS4zOTIgMS41OTIgNS40NDggMCA5Ljg4Ni00LjQzNCA5Ljg4OS05Ljg4NS4wMDItNS40NjItNC40MTUtOS44OS05Ljg4MS05Ljg5Mi01LjQ1MiAwLTkuODg3IDQuNDM0LTkuODg5IDkuODg0LS4wMDEgMi4yMjUuNjUxIDMuODkxIDEuNzQ2IDUuNjM0bC0uOTk5IDMuNjQ4IDMuNzQyLS45ODF6bTExLjM4Ny01LjQ2NGMtLjA3NC0uMTI0LS4yNzItLjE5OC0uNTctLjM0Ny0uMjk3LS4xNDktMS43NTgtLjg2OC0yLjAzMS0uOTY3LS4yNzItLjA5OS0uNDctLjE0OS0uNjY5LjE0OS0uMTk4LjI5Ny0uNzY4Ljk2Ny0uOTQxIDEuMTY1LS4xNzMuMTk4LS4zNDcuMjIzLS42NDQuMDc0LS4yOTctLjE0OS0xLjI1NS0uNDYyLTIuMzktMS40NzUtLjg4My0uNzg4LTEuNDgtMS43NjEtMS42NTMtMi4wNTktLjE3My0uMjk3LS4wMTgtLjQ1OC4xMy0uNjA2LjEzNC0uMTMzLjI5Ny0uMzQ3LjQ0Ni0uNTIxLjE1MS0uMTcyLjItLjI5Ni4zLS40OTUuMDk5LS4xOTguMDUtLjM3Mi0uMDI1LS41MjEtLjA3NS0uMTQ4LS42NjktMS42MTEtLjkxNi0yLjIwNi0uMjQyLS41NzktLjQ4Ny0uNTAxLS42NjktLjUxbC0uNTctLjAxYy0uMTk4IDAtLjUyLjA3NC0uNzkyLjM3MnMtMS4wNCAxLjAxNi0xLjA0IDIuNDc5IDEuMDY1IDIuODc2IDEuMjEzIDMuMDc0Yy4xNDkuMTk4IDIuMDk1IDMuMiA1LjA3NiA0LjQ4Ny43MDkuMzA2IDEuMjYzLjQ4OSAxLjY5NC42MjYuNzEyLjIyNiAxLjM2LjE5NCAxLjg3Mi4xMTguNTcxLS4wODUgMS43NTgtLjcxOSAyLjAwNi0xLjQxMy4yNDgtLjY5NS4yNDgtMS4yOS4xNzMtMS40MTR6Ii8+PC9zdmc+";
var email = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAzdjE4aDI0di0xOGgtMjR6bTYuNjIzIDcuOTI5bC00LjYyMyA1LjcxMnYtOS40NThsNC42MjMgMy43NDZ6bS00LjE0MS01LjkyOWgxOS4wMzVsLTkuNTE3IDcuNzEzLTkuNTE4LTcuNzEzem01LjY5NCA3LjE4OGwzLjgyNCAzLjA5OSAzLjgzLTMuMTA0IDUuNjEyIDYuODE3aC0xOC43NzlsNS41MTMtNi44MTJ6bTkuMjA4LTEuMjY0bDQuNjE2LTMuNzQxdjkuMzQ4bC00LjYxNi01LjYwN3oiLz48L3N2Zz4=";
var linkedin = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgMGgtMTRjLTIuNzYxIDAtNSAyLjIzOS01IDV2MTRjMCAyLjc2MSAyLjIzOSA1IDUgNWgxNGMyLjc2MiAwIDUtMi4yMzkgNS01di0xNGMwLTIuNzYxLTIuMjM4LTUtNS01em0tMTEgMTloLTN2LTExaDN2MTF6bS0xLjUtMTIuMjY4Yy0uOTY2IDAtMS43NS0uNzktMS43NS0xLjc2NHMuNzg0LTEuNzY0IDEuNzUtMS43NjQgMS43NS43OSAxLjc1IDEuNzY0LS43ODMgMS43NjQtMS43NSAxLjc2NHptMTMuNSAxMi4yNjhoLTN2LTUuNjA0YzAtMy4zNjgtNC0zLjExMy00IDB2NS42MDRoLTN2LTExaDN2MS43NjVjMS4zOTYtMi41ODYgNy0yLjc3NyA3IDIuNDc2djYuNzU5eiIvPjwvc3ZnPg==";

export default function App() {
    return (
        <Footer backgroundColor="#58d3e5" theme='light' columnLayout='space-between'
    columns={[
        {
            title: "Register",
            style: {fontFamily: 'Ubuntu'},
            items: [
                {
                    title: "I am an Influencer",
                    url: "https://www.levance.in/createaccount1",
                    openExternal: false,
                    style: {fontFamily: 'Ubuntu'},
                },
                {
                    title: "I am a Brand",
                    url: "https://www.levance.in/brandprocess",
                    openExternal: false,
                    style: {fontFamily: 'Ubuntu'},
                },
                {
                    title: "Sign In",
                    url: "https://www.levance.in/signin",
                    openExternal: false,
                    style: {fontFamily: 'Ubuntu'},
                },
            ]
        },
        {
            title: "Information",
            style: {fontFamily: 'Ubuntu'},
            items: [
                {
                    icon: (<img src={email} />),
                    title: "Email Us",
                    url: "https://wa.me/message/UQOL22GN45YMM1",
                    openExternal: false,
                    style: {fontFamily: 'Ubuntu'},
                },
                {
                    icon: (<img src={whatsapp} />),
                    title: "Text Us",
                    url: "mailto:contact@levance.in",
                    openExternal: false,
                    style: {fontFamily: 'Ubuntu'},
                },
                {
                    title: "T&C",
                    url: "https://www.levance.in/termsandconditions",
                    openExternal: false,
                    style: {fontFamily: 'Ubuntu'},
                },
                {
                    title: "Privacy Policy",
                    url: "https://levance.in/privacypolicy",
                    openExternal: false,
                    style: {fontFamily: 'Ubuntu'},
                },
            ]
        },
        {
            title: 'Follow Us On:',
            style: {fontFamily: 'Ubuntu'},
            items: [
                {
                    icon: (<img src={instagram} />),
                    url: 'https://www.instagram.com/levance.in',
                    title: "Instagram",
                    openExternal: true,
                    style: {fontFamily: 'Ubuntu'},
                },
                {
                    icon: (<img src={facebook} />),
                    url: 'https://www.instagram.com/levance.in',
                    title: "Facebook",
                    openExternal: true,
                    style: {fontFamily: 'Ubuntu'},
                },
                {
                    icon: (<img src={linkedin} />),
                    url: 'https://www.instagram.com/levance.in',
                    title: "LinkedIn",
                    openExternal: true,
                    style: {fontFamily: 'Ubuntu'},
                }
            ]
        },
    ]}
    bottom="2021 &#169; Copyrights retained by Levance"
  />
  )
}