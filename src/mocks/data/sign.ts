export const signResponse = {
  signUp: {
    success: {
      statusCode: 201,
      message: '회원가입에 성공하였습니다.',
      data: null,
    },

    failure: {
      duplicateId: {
        statusCode: 409,
        message: '중복된 아이디입니다.',
        data: null,
      },

      invalidInputFormat: {
        statusCode: 400,
        message: '유효하지 않은 입력형식입니다.',
        data: [
          {
            field: 'loginId',
            defaultMessage:
              '아이디는 띄어쓰기 없이 영문, 숫자로 구성되며 2~12글자로 구성되어야 합니다.',
          },
          {
            field: 'addrName',
            defaultMessage: '주소 이름은 공백이면 안됩니다.',
          },
        ],
      },

      incorrectAuthorizationCode: {
        statusCode: 400,
        message: '잘못된 인가 코드입니다.',
        data: null,
      },
    },
  },

  signIn: {
    success: {
      statusCode: 200,
      message: '로그인에 성공하였습니다.',
      data: {
        jwt: {
          accessToken: 'r3h0933gw0hg0gwh.s0-9ujheg.-sdjgiwg',
          refreshToken: '0shdg09ehwg0hewg.w0ghe0wgh.wg0h0g',
        },
        user: {
          loginId: 'bruni',
          profileUrl: 'http~',
        },
      },
    },
  },
};
