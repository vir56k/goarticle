package utils

type MyError struct {
	ErrorMessage string
}

func (e MyError) Error() string {
	return e.ErrorMessage
}

